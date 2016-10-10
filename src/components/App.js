import React, { Component } from 'react';
import Header from './Header';
import {connect} from 'react-redux';
import _ from 'lodash';
import {
	Row,
	Col,
	FormGroup,
	FormControl,
	Button,
	InputGroup,
	ListGroup,
	ListGroupItem
} from 'react-bootstrap';

export class App extends Component {
	constructor(props) {
		super(props)
		this.state = {todo: {description: ''}};
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
                        <FormControl type="text" onChange={this.handleTodoDescriptionOnChange.bind(this)}/>
                        <InputGroup.Button>
                            <Button type="button" bsStyle="primary" bsSize="large" disabled={this.submitButtonIsDisabled()}>Do!</Button>
                        </InputGroup.Button>
                    </InputGroup>
                </FormGroup>
            </form>
		);
	}

	handleTodoDescriptionOnChange(event) {
		this.setState({todo: {description: event.target.value}});
	}

	submitButtonIsDisabled() {
		if(this.state.todo.description.match(/\w+/)) {
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
		todos: state.todos
	};
}

export default connect(mapStateToProps, null)(App);