import React, { Component } from 'react';
import Header from './Header';
import {connect} from 'react-redux';
import {createTodoRequestAction, deleteTodoRequestAction, displaceTodoRequestAction} from '../actions/todoActions';
import {getHomeResourcesRequestAction} from '../actions/homeResourcesActions';
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
	ListGroupItem,
	Glyphicon,
	Tabs,
	Tab
} from 'react-bootstrap';

export class App extends Component {
	constructor(props) {
		super(props)
		this.state = {todo: {task: ''}, submitting: false, activeTab: 'now'};
	}

	componentDidMount() {
		this.props.getHomeResourcesRequestAction(localStorage.getItem('link'));
	}

	render() {
		return (<HotKeys handlers={{cancel: (event) => this.handleCancelTaskSubmit(event),}}>
			<Header />
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
                <FormGroup controlId="todo" bsSize="large">
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
					<Button type="button" bsStyle="danger" bsSize="large" onClick={this.toggleSubmit.bind(this)}>
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
	}

	deleteTodo(link) {
		this.props.deleteTodoRequestAction(link);
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
				return (<ListGroupItem key={index}>
					{this.renderListItem(todo)}
				</ListGroupItem>);
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

	renderListItem(todo) {
		if(this.canBeDisplaced(todo)) {
		    return (<Row>
		            <Col lg={1}><Button className="icon-button" bsStyle="primary" type="button" bsSize="xsmall" onClick={this.displaceTodo.bind(this, todo._links.displace)}><Glyphicon glyph="menu-right"/></Button></Col>
		            <Col lg={11}>{todo.task}</Col>
		        </Row>);
		} else {
	        return (<Row>
	                <Col lg={11}>{todo.task}</Col>
	                <Col lg={1}><a className="icon-button" onClick={this.deleteTodo.bind(this, todo._links.delete)}><Glyphicon glyph="remove"/></a></Col>
	            </Row>);
		}
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
	deleteTodoRequestAction,
	displaceTodoRequestAction,
	getHomeResourcesRequestAction
})(App);