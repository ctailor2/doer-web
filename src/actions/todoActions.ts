import { Link } from '../api/api';
import { Todo, TodoForm } from '../api/todo';
import { ActionTypes } from '../constants/actionTypes';

export interface CreateTodoRequestAction {
    type: ActionTypes.CREATE_TODO_REQUEST_ACTION;
    link: Link;
    todo: TodoForm;
}

export const createTodoRequestAction = (link: Link, todo: TodoForm): CreateTodoRequestAction => ({
    type: ActionTypes.CREATE_TODO_REQUEST_ACTION,
    link,
    todo,
});

export interface DeleteTodoRequestAction {
    type: ActionTypes.DELETE_TODO_REQUEST_ACTION;
    link: Link;
}

export const deleteTodoRequestAction = (link: Link): DeleteTodoRequestAction => ({
    type: ActionTypes.DELETE_TODO_REQUEST_ACTION,
    link,
});

export interface MoveTodoRequestAction {
    type: ActionTypes.MOVE_TODO_REQUEST_ACTION;
    link: Link;
}

export const moveTodoRequestAction = (link: Link): MoveTodoRequestAction => ({
    type: ActionTypes.MOVE_TODO_REQUEST_ACTION,
    link,
});

export interface DisplaceTodoRequestAction {
    type: ActionTypes.DISPLACE_TODO_REQUEST_ACTION;
    link: Link;
    todo: TodoForm;
}

export const displaceTodoRequestAction = (link: Link, todo: TodoForm): DisplaceTodoRequestAction => ({
    type: ActionTypes.DISPLACE_TODO_REQUEST_ACTION,
    link,
    todo,
});

export interface UpdateTodoRequestAction {
    type: ActionTypes.UPDATE_TODO_REQUEST_ACTION;
    link: Link;
    todo: TodoForm;
}

export const updateTodoRequestAction = (link: Link, todo: TodoForm): UpdateTodoRequestAction => ({
    type: ActionTypes.UPDATE_TODO_REQUEST_ACTION,
    link,
    todo,
});

export interface CompleteTodoRequestAction {
    type: ActionTypes.COMPLETE_TODO_REQUEST_ACTION;
    link: Link;
}

export const completeTodoRequestAction = (link: Link): CompleteTodoRequestAction => ({
    type: ActionTypes.COMPLETE_TODO_REQUEST_ACTION,
    link,
});

export interface PullTodosRequestAction {
    type: ActionTypes.PULL_TODOS_REQUEST_ACTION;
    link: Link;
}

export const pullTodosRequestAction = (link: Link): PullTodosRequestAction => ({
    type: ActionTypes.PULL_TODOS_REQUEST_ACTION,
    link,
});

export interface EscalateTodosRequestAction {
    type: ActionTypes.ESCALATE_TODOS_REQUEST_ACTION;
    link: Link;
}

export const escalateTodosRequestAction = (link: Link): EscalateTodosRequestAction => ({
    type: ActionTypes.ESCALATE_TODOS_REQUEST_ACTION,
    link,
});
