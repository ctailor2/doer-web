import _ from 'lodash';
import React, { Component } from 'react';
import {
    Col,
    ListGroup,
    ListGroupItem,
    Panel,
    Row,
} from 'react-bootstrap';
import { CompletedTodo } from '../../api/completedList';

interface Props {
    todos: CompletedTodo[];
}

export default (props: Props) => {
    const renderHistory = () => {
        const groupedTodos = _.groupBy(props.todos, (todo) => {
            return new Date(Date.parse(todo.completedAt)).toLocaleDateString();
        });
        return _.map(groupedTodos, (todos, dateString) => {
            return (<Panel key={dateString}>
                <Panel.Heading>{dateString}</Panel.Heading>
                {renderTodoList(todos)}
            </Panel>);
        });
    }

    const renderTodoList = (todos: CompletedTodo[]) => {
        return (<ListGroup>
            {todos.map((todo, itemIndex) => {
                return (<ListGroupItem key={itemIndex}>{todo.task}</ListGroupItem>);
            })}
        </ListGroup>);
    }
    return (<div>
        <Row>
            <Col lg={6} lgOffset={3}>
                {renderHistory()}
            </Col>
        </Row>
    </div>);
}
