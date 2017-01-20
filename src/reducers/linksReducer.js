import * as actionTypes from '../constants/actionTypes';
import _ from 'lodash';

export function links(state = {}, action = {}) {
	let newState = _.clone(state);
	switch(action.type) {
		case actionTypes.STORE_LINKS_ACTION:
			newState = action.links;
			break;
		default:
			break;
	}
	return newState
}