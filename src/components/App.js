import React, {Component} from 'react';
import Todo from './Todo';
import {connect} from 'react-redux';
import {
    createTodoRequestAction,
    displaceTodoRequestAction,
    moveTodoRequestAction,
    pullTodosRequestAction
} from '../actions/todoActions';
import {
    unlockListRequestAction
} from '../actions/listActions';
import _ from 'lodash';
import {HotKeys} from 'react-hotkeys';
import {
	Row,
	Col,
	FormGroup,
	FormControl,
	Button,
	InputGroup,
	ListGroup,
	Glyphicon,
	Tabs,
	Tab,
	ListGroupItem,
	Modal
} from 'react-bootstrap';

export class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
		    todo: {task: ''},
		    submitting: false,
		    showUnlockConfirmation: false,
		    activeTab: props.list.name
		};
	}

	render() {
		return (<HotKeys handlers={{cancel: (event) => this.handleCancelTaskSubmit(event),}}>
	        <Row>
				<Col lg={6} lgOffset={3}>
					{this.renderForm()}
					{this.renderTabs()}
				</Col>
	        </Row>
	        {this.renderModal()}
		</HotKeys>);
	}

	renderModal() {
	    return (<Modal show={this.state.showUnlockConfirmation} onHide={this.closeModal.bind(this)}>
            <Modal.Header closeButton>
                <Modal.Title>Unlock Later list?</Modal.Title>
            </Modal.Header>
            <Modal.Body>The Later list can only be unlocked once a day.</Modal.Body>
            <Modal.Footer>
                <Button onClick={this.closeModal.bind(this)}>Cancel</Button>
                <Button onClick={this.handleUnlockClick.bind(this)}>Unlock</Button>
            </Modal.Footer>
        </Modal>);
	}

	closeModal() {
	    this.setState({showUnlockConfirmation: false});
	}

	handleUnlockClick() {
	    this.props.unlockListRequestAction(this.props.list._links.unlock)
	    this.closeModal();
	}

	renderForm() {
		return (
			<div>
                <FormGroup bsSize="large">
                    <InputGroup>
                        <HotKeys handlers={{submit: (event) => this.handleTaskSubmit(event)}}>
	                        <FormControl
	                            type="text"
	                            inputRef={ref => { this.taskInput = ref; }}
	                            onChange={this.handleTodoDescriptionOnChange.bind(this)}/>
                        </HotKeys>
                        {this.renderFormButtonGroup()}
                    </InputGroup>
                </FormGroup>
            </div>
		);
	}

	handleSelectTab(tabKey, event) {
	    if(tabKey === this.props.list.name) {
            this.setState({activeTab: tabKey});
	    } else {
            if(this.canViewDeferredTodos()) {
                this.setState({activeTab: tabKey});
            } else {
                this.setState({showUnlockConfirmation: true});
            }
	    }
	}

	renderTabs() {
		return (
			<Tabs activeKey={this.state.activeTab} onSelect={this.handleSelectTab.bind(this)} id='tabs'>
		        <Tab eventKey={this.props.list.name} title={_.capitalize(this.props.list.name)}>
					<ListGroup>
                        {this.props.nowTodos.map((todo, index) => {
                            return this.renderListItem(todo, index);
                        })}
                        {this.renderReplenishButton()}
                    </ListGroup>
		        </Tab>
		        <Tab eventKey={this.props.list.deferredName} title={this.renderDeferredTodosTabTitle()} disabled={this.deferredTodosTabIsDisabled()}>
					<ListGroup>
                        {this.props.laterTodos.map((todo, index) => {
                            return this.renderListItem(todo, index);
                        })}
                    </ListGroup>
                </Tab>
            </Tabs>
		);
	}

	deferredTodosTabIsDisabled() {
	    return !this.canViewDeferredTodos() && _.isUndefined(this.props.list._links.unlock)
	}

	renderDeferredTodosTabTitle() {
	    let tabName = _.capitalize(this.props.list.deferredName)
	    if(this.canViewDeferredTodos()) {
            return (<div>
                {tabName}
            </div>);
	    } else {
            return (<div>
                <Glyphicon glyph="lock" /> {tabName}
            </div>);
	    }
	}

	canViewDeferredTodos() {
	    return !_.isUndefined(this.props.list._links.deferredTodos);
	}

	renderReplenishButton() {
		if(!_.isUndefined(this.props.list._links.pull)) {
			return (<ListGroupItem onClick={this.handlePullClick.bind(this)} bsStyle="info">
                Replenish <Glyphicon glyph="refresh" />
            </ListGroupItem>);
		}
	}

	handlePullClick() {
		this.props.pullTodosRequestAction(this.props.list._links.pull);
	}

	handleCancelTaskSubmit() {
		if(this.state.submitting) {
			this.toggleSubmit();
			this.taskInput.focus();
		}
	}

	handleTaskSubmit() {
		if(this.todoHasTask()) {
			this.toggleSubmit();
		}
	}

	renderFormButtonGroup() {
		if(this.state.submitting) {
			return(<InputGroup.Button>
					{this.renderNowButton()}
					<Button type="button" bsSize="large" onClick={this.submitTodo.bind(this, this.props.list._links.createDeferred)}>Later</Button>
					<Button type="button" bsStyle="danger" bsSize="large" onClick={this.handleCancelTaskSubmit.bind(this)}>
						<Glyphicon glyph="remove"/>
					</Button>
				</InputGroup.Button>);
		} else {
			return(<InputGroup.Button>
					<Button type="button" bsStyle="primary" bsSize="large"
			            disabled={this.submitButtonIsDisabled()}
			            onClick={this.toggleSubmit.bind(this)}>
			                Do!
					</Button>
				</InputGroup.Button>);
		}
	}

	renderNowButton() {
		if(this.canScheduleForNow()) {
			return (<Button type="button" bsStyle="primary" bsSize="large" onClick={this.submitTodo.bind(this, this.props.list._links.create)}>Now</Button>);
		}
	}

	canScheduleForNow() {
		return !_.isUndefined(this.props.list._links.create);
	}

	toggleSubmit() {
		this.setState({submitting: !this.state.submitting});
	}

	submitTodo(link) {
		let todo = this.state.todo;
		this.props.createTodoRequestAction(link, todo);
		this.toggleSubmit();
		this.resetTask();
	}

	resetTask() {
		this.setState({todo: {task: ''}});
		this.taskInput.value = '';
		this.taskInput.focus();
	}

	handleTodoDescriptionOnChange(event) {
		this.setState({todo: {task: event.target.value}});
	}

	submitButtonIsDisabled() {
		return !this.todoHasTask();
	}

	todoHasTask() {
		return this.state.todo.task.match(/\w+/);
	}

	renderList(todos) {
		return(<ListGroup>
			{todos.map((todo, index) => {
				return this.renderListItem(todo, index);
            })}
		</ListGroup>);
	}

	canBeDisplaced(todo) {
		return this.state.submitting && !_.isUndefined(todo._links.displace);
	}

	displaceTodo(link) {
		let todo = this.state.todo;
		this.props.displaceTodoRequestAction(link, todo);
		this.toggleSubmit();
        this.resetTask();
	}

	moveItem(link) {
	    this.props.moveTodoRequestAction(link);
	}

	renderListItem(todo, index) {
		return (<Todo key={index}
					index={index}
					handleMove={this.moveItem.bind(this)}
					readOnly={this.state.submitting}
					task={todo.task}
					links={todo._links}
					handleDisplace={this.displaceTodo.bind(this)} />);
	}
}

export const mapStateToProps = (state) => {
	return {
		nowTodos: state.todos.active,
		laterTodos: state.todos.inactive,
		list: state.list
	};
}

export default connect(mapStateToProps, {
	createTodoRequestAction,
	displaceTodoRequestAction,
	moveTodoRequestAction,
	pullTodosRequestAction,
	unlockListRequestAction
})(App);