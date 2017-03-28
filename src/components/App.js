import React, {Component} from 'react';
import Todo from './Todo';
import {connect} from 'react-redux';
import {createTodoRequestAction, displaceTodoRequestAction, moveTodoRequestAction} from '../actions/todoActions';
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
	Tab
} from 'react-bootstrap';
import DraggableListGroupItem from './DraggableListGroupItem';
// TODO: May want to include this
//import update from 'immutability-helper';

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
					{this.renderList(this.props.nowTodos)}
		        </Tab>
		        <Tab eventKey='later' title='Later'>
					{this.renderList(this.props.laterTodos)}
                </Tab>
            </Tabs>
		);
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
					<Button type="button" bsSize="large" onClick={this.submitTodo.bind(this, this.props.links.todoLater)}>Later</Button>
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
			return (<Button type="button" bsStyle="primary" bsSize="large" onClick={this.submitTodo.bind(this, this.props.links.todoNow)}>Now</Button>);
		}
	}

	canScheduleForNow() {
		return !_.isUndefined(this.props.links.todoNow);
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

	moveItem(fromIndex, toIndex) {
		// TODO: Make this work for either now or later todos
	    let originalTodo = this.props.laterTodos[fromIndex];
	    this.props.moveTodoRequestAction(originalTodo._links.move[toIndex]);

		// TODO: May want to include this
//		this.setState(update(this.state, {
//			laterTodos: {
//				$splice: [
//	              [fromIndex, 1],
//	              [toIndex, 0, originalItem]
//	            ]
//			}
//		}));
	}

	renderListItem(todo, index) {
		// TODO: Only allow readOnly Todos to be moved
		return (<DraggableListGroupItem key={index} index={index} moveItem={this.moveItem.bind(this)}>
			<Todo key={index}
				index={index}
				readOnly={this.state.submitting}
				task={todo.task}
				links={todo._links}
				handleDisplace={this.displaceTodo.bind(this)} />
		</DraggableListGroupItem>);
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
	moveTodoRequestAction
})(App);