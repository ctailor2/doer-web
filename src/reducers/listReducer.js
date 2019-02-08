import {ActionTypes} from '../constants/actionTypes';
import _ from 'lodash';

export function list(state = {}, action = {}) {
	let newState = _.clone(state);
	switch(action.type) {
		case ActionTypes.STORE_LIST_ACTION:
			newState = action.list;
			break;
		default:
			break;
	}
	return newState
}