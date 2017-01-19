import React, { Component } from 'react';
import Header from './Header';
import {connect} from 'react-redux';
import {createTodoRequestAction, getTodosRequestAction} from '../actions/todoActions';
import _ from 'lodash';
import {
	Row,
	Col,
	FormGroup,
	FormControl,
	Button,
	InputGroup,
	ListGroup,
	ListGroupItem,
	Glyphicon
} from 'react-bootstrap';

export class App extends Component {
	constructor(props) {
		super(props)
		this.state = {todo: {task: ''}, submitting: false};
	}

	componentDidMount() {
		this.props.getTodosRequestAction('now');
	}

	render() {
		return (<div>
			<Header />
	        <Row>
				<Col lg={6} lgOffset={3}>
					{this.renderForm()}
					{this.renderList()}
				</Col>
	        </Row>
		</div>);
	}

	renderForm() {
		return(
			<form>
                <FormGroup controlId="todo" bsSize="large">
                    <InputGroup>
                        <FormControl
                            disabled={this.state.submitting}
                            inputRef={ref => { this.taskInput = ref; }}
                            type="text" onChange={this.handleTodoDescriptionOnChange.bind(this)}/>
                        {this.renderFormButtonGroup()}
                    </InputGroup>
                </FormGroup>
            </form>
		);
	}

	renderFormButtonGroup() {
		if(this.state.submitting) {
			return(<InputGroup.Button>
					<Button type="button" bsStyle="primary" bsSize="large" onClick={this.submitTodo.bind(this, 'now')}>Now</Button>
					<Button type="button" bsSize="large" onClick={this.submitTodo.bind(this, 'later')}>Later</Button>
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

	toggleSubmit() {
		let newState = !this.state.submitting;
		this.setState({submitting: newState});
		if (newState == false) {
			// TODO: the input does not refocus bc of a timing issue with re-enabling the input
			this.taskInput.focus();
		}
	}

	submitTodo(scheduling) {
		let todo = this.state.todo;
		todo.scheduling = scheduling;
		this.props.createTodoRequestAction(todo);
		this.toggleSubmit();
		this.taskInput.value = '';
	}

	handleTodoDescriptionOnChange(event) {
		this.setState({todo: {task: event.target.value, scheduling: 'now'}});
	}

	submitButtonIsDisabled() {
		if(this.state.todo.task.match(/\w+/)) {
			return false;
		}
		return true;
	}

	renderList() {
		return(<ListGroup>
			{this.props.todos.map((todo, index) => {
                return(<ListGroupItem key={index}>
                    {todo.task}
                </ListGroupItem>);
            })}
		</ListGroup>);
	}
}

export const mapStateToProps = (state) => {
	return {
		todos: state.todos.active
	};
}

export default connect(mapStateToProps, {createTodoRequestAction, getTodosRequestAction})(App);