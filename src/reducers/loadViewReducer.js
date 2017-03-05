import * as actionTypes from '../constants/actionTypes';
import _ from 'lodash';

export function loadView(state = {todosViewLoaded: false, historyViewLoaded: false}, action = {}) {
	let newState = _.clone(state);
	switch(action.type) {
		case actionTypes.LOAD_TODOS_VIEW_COMPLETE_ACTION:
			newState.todosViewLoaded = true;
			break;
		case actionTypes.LOAD_HISTORY_VIEW_COMPLETE_ACTION:
			newState.historyViewLoaded = true;
			break;
		default:
			break;
	}
	return newState
}