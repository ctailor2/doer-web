import * as actionTypes from '../constants/actionTypes';

export function getTodosRequestAction() {
	return {
		type: actionTypes.GET_TODOS_REQUEST_ACTION
	}
}

export function storeTodosAction(todos = []) {
	return {
		type: actionTypes.STORE_TODOS_ACTION,
		todos: todos
	}
}