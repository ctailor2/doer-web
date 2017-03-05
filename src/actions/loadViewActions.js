import * as actionTypes from '../constants/actionTypes';

export function loadTodosViewAction() {
	return {
		type: actionTypes.LOAD_TODOS_VIEW_ACTION
	}
}

export function loadTodosViewCompleteAction() {
	return {
		type: actionTypes.LOAD_TODOS_VIEW_COMPLETE_ACTION
	}
}

export function loadHistoryViewAction() {
	return {
		type: actionTypes.LOAD_HISTORY_VIEW_ACTION
	}
}

export function loadHistoryViewCompleteAction() {
	return {
		type: actionTypes.LOAD_HISTORY_VIEW_COMPLETE_ACTION
	}
}