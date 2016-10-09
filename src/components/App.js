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
                        <FormControl type="text" />
                        <InputGroup.Button>
                            <Button type="button" bsStyle="primary" bsSize="large" disabled={true}>Do!</Button>
                        </InputGroup.Button>
                    </InputGroup>
                </FormGroup>
            </form>
		);
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