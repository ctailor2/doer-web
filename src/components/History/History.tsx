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

export class History extends Component<Props> {
    public render() {
        return (<div>
            <Row>
                <Col lg={6} lgOffset={3}>
                    {this.renderHistory()}
                </Col>
            </Row>
        </div>);
    }

    public renderHistory() {
        const groupedTodos = _.groupBy(this.props.todos, (todo) => {
            return new Date(Date.parse(todo.completedAt)).toLocaleDateString();
        });
        return _.map(groupedTodos, (todos, dateString) => {
            // @ts-ignore
            return (<Panel key={dateString}>
                <Panel.Heading>{dateString}</Panel.Heading>
                {this.renderTodoList(todos)}
            </Panel>);
        });
    }

    public renderTodoList(todos: CompletedTodo[]) {
        return (<ListGroup fill={true}>
            {todos.map((todo, itemIndex) => {
                return (<ListGroupItem key={itemIndex}>{todo.task}</ListGroupItem>);
            })}
        </ListGroup>);
    }
}
