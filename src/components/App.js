import React, {Component} from 'react';
import Todo from './Todo';
import {connect} from 'react-redux';
import {createTodoRequestAction, displaceTodoRequestAction, moveTodoRequestAction, pullTodosRequestAction} from '../actions/todoActions';
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
} from 'react-bootstrap';

export class App extends Component {
	constructor(props) {
		super(props)
		this.state = {todo: {task: ''}, submitting: false, activeTab: 'now'};
	}

	render() {
		return (<HotKeys handlers={{cancel: (event) => this.handleCancelTaskSubmit(event),}}>
	        <Row>
				<Col lg={6} lgOffset={3}>
					{this.renderForm()}
					{this.renderTabs()}
				</Col>
	        </Row>
		</HotKeys>);
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

	handleSelectTab(tabKey) {
		this.setState({activeTab: tabKey});
	}

	renderTabs() {
		return (
			<Tabs activeKey={this.state.activeTab} onSelect={this.handleSelectTab.bind(this)} id='tabs'>
		        <Tab eventKey='now' title='Now'>
					<ListGroup>
                        {this.props.nowTodos.map((todo, index) => {
                            return this.renderListItem(todo, index);
                        })}
                        {this.renderReplenishButton()}
                    </ListGroup>
		        </Tab>
		        <Tab eventKey='later' title='Later'>
					<ListGroup>
                        {this.props.laterTodos.map((todo, index) => {
                            return this.renderListItem(todo, index);
                        })}
                    </ListGroup>
                </Tab>
            </Tabs>
		);
	}

	renderReplenishButton() {
		if(!_.isUndefined(this.props.links.pull)) {
			return (<ListGroupItem onClick={this.handlePullClick.bind(this)} bsStyle="info">
                Replenish <Glyphicon glyph="refresh" />
            </ListGroupItem>);
		}
	}

	handlePullClick() {
		this.props.pullTodosRequestAction(this.props.links.pull);
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
					<Button type="button" bsSize="large" onClick={this.submitTodo.bind(this, this.props.links.todoLater, 'later')}>Later</Button>
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
			return (<Button type="button" bsStyle="primary" bsSize="large" onClick={this.submitTodo.bind(this, this.props.links.todoNow, 'now')}>Now</Button>);
		}
	}

	canScheduleForNow() {
		return !_.isUndefined(this.props.links.todoNow);
	}

	toggleSubmit() {
		this.setState({submitting: !this.state.submitting});
	}

	submitTodo(link, scheduling) {
		let todo = this.state.todo;
		this.props.createTodoRequestAction(link, todo, scheduling);
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
		links: state.links
	};
}

export default connect(mapStateToProps, {
	createTodoRequestAction,
	displaceTodoRequestAction,
	moveTodoRequestAction,
	pullTodosRequestAction
})(App);