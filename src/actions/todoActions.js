import * as actionTypes from '../constants/actionTypes';

export function getTodosRequestAction(scheduling) {
	return {
		type: actionTypes.GET_TODOS_REQUEST_ACTION,
		scheduling: scheduling
	}
}

export function storeTodosAction(todos = []) {
	return {
		type: actionTypes.STORE_TODOS_ACTION,
		todos: todos
	}
}