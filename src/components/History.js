import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
	Row,
	Col,
	ListGroup,
	ListGroupItem,
	Panel
} from 'react-bootstrap';
import _ from 'lodash';

export class History extends Component {
	render() {
		return (<div>
	        <Row>
                <Col lg={6} lgOffset={3}>
					{this.renderHistory()}
                </Col>
            </Row>
		</div>);
	}

	renderHistory() {
		let groupedTodos = _.groupBy(this.props.todos, (todo) => {
		    return new Date(Date.parse(todo.completedAt)).toLocaleDateString()
        });
		return _.map(groupedTodos, (todos, dateString) => {
			return (<Panel header={dateString} key={dateString}>
				{this.renderTodoList(todos)}
		    </Panel>);
		});
	}

	renderTodoList(todos) {
        return (<ListGroup fill={true}>
            {todos.map((todo, itemIndex) => {
                return (<ListGroupItem key={itemIndex}>{todo.task}</ListGroupItem>);
            })}
        </ListGroup>);
	}
}

export const mapStateToProps = (state) => {
	return {
		todos: state.completedList.todos
	};
}

export default connect(mapStateToProps, {})(History);