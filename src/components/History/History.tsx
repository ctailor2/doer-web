import _ from 'lodash';
import React, { Component } from 'react';
import {
    Col,
    ListGroup,
    ListGroupItem,
    Panel,
    Row,
} from 'react-bootstrap';
import { CompletedList, CompletedTodo } from '../../api/completedList';
import { ApplicationState } from '../../store';

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
            return (<Panel header={dateString} key={dateString}>
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