import {ActionTypes} from '../constants/actionTypes';

export function loadTodosViewAction() {
	return {
		type: ActionTypes.LOAD_TODOS_VIEW_ACTION
	}
}

export function loadHistoryViewAction() {
	return {
		type: ActionTypes.LOAD_HISTORY_VIEW_ACTION
	}
}