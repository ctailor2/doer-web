import React, { Component } from 'react';
import Header from './Header';
import {connect} from 'react-redux';
import {createTodoRequestAction} from '../actions/todoActions';
import {getHomeResourcesRequestAction} from '../actions/homeResourcesActions';
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
		this.props.getHomeResourcesRequestAction(localStorage.getItem('link'));
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
			<div>
                <FormGroup controlId="todo" bsSize="large">
                    <InputGroup>
                        <FormControl
                            type="text"
                            disabled={this.state.submitting}
                            inputRef={ref => { this.taskInput = ref; }}
                            onChange={this.handleTodoDescriptionOnChange.bind(this)}
                            onKeyPress={this.handleTodoDescriptionKeyPress.bind(this)}/>
                        {this.renderFormButtonGroup()}
                    </InputGroup>
                </FormGroup>
            </div>
		);
	}

	handleTodoDescriptionKeyPress(event) {
		if(event.key === 'Enter' && this.todoHasTask()) {
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
		if(!_.isUndefined(this.props.links.todoNow)) {
			return (<Button type="button" bsStyle="primary" bsSize="large" onClick={this.submitTodo.bind(this, this.props.links.todoNow)}>Now</Button>);
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

	submitTodo(link) {
		let todo = this.state.todo;
		this.props.createTodoRequestAction(link, todo);
		this.toggleSubmit();
		this.taskInput.value = '';
	}

	handleTodoDescriptionOnChange(event) {
		this.setState({todo: {task: event.target.value}});
	}

	submitButtonIsDisabled() {
		if(this.todoHasTask()) {
			return false;
		}
		return true;
	}

	todoHasTask() {
		return this.state.todo.task.match(/\w+/);
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
		todos: state.todos.active,
		links: state.links
	};
}

export default connect(mapStateToProps, {createTodoRequestAction, getHomeResourcesRequestAction})(App);