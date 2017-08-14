import * as actionTypes from '../constants/actionTypes';
import _ from 'lodash';

export function list(state = {}, action = {}) {
	let newState = _.clone(state);
	switch(action.type) {
		case actionTypes.STORE_LIST_ACTION:
			newState = action.list;
			break;
		default:
			break;
	}
	return newState
}