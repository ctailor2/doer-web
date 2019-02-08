import {ActionTypes} from '../constants/actionTypes';

export function createTodoRequestAction(link = {}, todo = {}) {
	return {
		type: ActionTypes.CREATE_TODO_REQUEST_ACTION,
		link: link,
		todo: todo
	}
}

export function deleteTodoRequestAction(link = {}) {
	return {
		type: ActionTypes.DELETE_TODO_REQUEST_ACTION,
		link: link
	}
}

export function moveTodoRequestAction(link = {}) {
	return {
		type: ActionTypes.MOVE_TODO_REQUEST_ACTION,
		link: link
	}
}

export function displaceTodoRequestAction(link = {}, todo = {}) {
	return {
		type: ActionTypes.DISPLACE_TODO_REQUEST_ACTION,
		link: link,
		todo: todo
	}
}

export function updateTodoRequestAction(link = {}, todo = {}) {
	return {
		type: ActionTypes.UPDATE_TODO_REQUEST_ACTION,
		link: link,
		todo: todo
	}
}

export function completeTodoRequestAction(link = {}) {
	return {
		type: ActionTypes.COMPLETE_TODO_REQUEST_ACTION,
		link: link
	}
}

export function pullTodosRequestAction(link = {}) {
	return {
		type: ActionTypes.PULL_TODOS_REQUEST_ACTION,
		link: link
	}
}

export function escalateTodosRequestAction(link = {}) {
	return {
		type: ActionTypes.ESCALATE_TODOS_REQUEST_ACTION,
		link: link
	}
}
