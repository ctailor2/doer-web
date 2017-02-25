import * as actionTypes from '../constants/actionTypes';

export function getTodosRequestAction(link = {}) {
	return {
		type: actionTypes.GET_TODOS_REQUEST_ACTION,
		link: link
	}
}

export function storeTodosAction(todos = [], scheduling = 'anytime') {
	return {
		type: actionTypes.STORE_TODOS_ACTION,
		todos: todos,
		scheduling: scheduling
	}
}

export function createTodoRequestAction(link = {}, todo = {}) {
	return {
		type: actionTypes.CREATE_TODO_REQUEST_ACTION,
		link: link,
		todo: todo
	}
}

export function deleteTodoRequestAction(link = {}) {
	return {
		type: actionTypes.DELETE_TODO_REQUEST_ACTION,
		link: link
	}
}

export function displaceTodoRequestAction(link = {}, todo = {}) {
	return {
		type: actionTypes.DISPLACE_TODO_REQUEST_ACTION,
		link: link,
		todo: todo
	}
}

export function updateTodoRequestAction(link = {}, todo = {}) {
	return {
		type: actionTypes.UPDATE_TODO_REQUEST_ACTION,
		link: link,
		todo: todo
	}
}

export function completeTodoRequestAction(link = {}) {
	return {
		type: actionTypes.COMPLETE_TODO_REQUEST_ACTION,
		link: link
	}
}
