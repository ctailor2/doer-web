import * as actionTypes from '../constants/actionTypes';

export function getTodosRequestAction(scheduling) {
	return {
		type: actionTypes.GET_TODOS_REQUEST_ACTION,
		scheduling: scheduling
	}
}

export function storeTodosAction(todos = [], scheduling = 'anytime') {
	return {
		type: actionTypes.STORE_TODOS_ACTION,
		todos: todos,
		scheduling: scheduling
	}
}

export function createTodoRequestAction(todo) {
	return {
		type: actionTypes.CREATE_TODO_REQUEST_ACTION,
		todo: todo
	}
}