import {ActionTypes} from '../constants/actionTypes';
import _ from 'lodash';

export function completedList(state = {}, action = {}) {
	let newState = _.clone(state);
	switch(action.type) {
		case ActionTypes.STORE_COMPLETED_LIST_ACTION:
			newState = action.list;
			break;
		default:
			break;
	}
	return newState
}