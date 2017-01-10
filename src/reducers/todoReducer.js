import * as actionTypes from '../constants/actionTypes';
import _ from 'lodash';

export function todos(state = {active: [], inactive: []}, action = {}) {
	let newState = _.clone(state);
	switch(action.type) {
		case actionTypes.STORE_TODOS_ACTION:
			[newState.active, newState.inactive] = _.partition(action.todos, function (todo) {
				return todo.scheduling == 'now';
			});
			return newState;
		default:
			return newState;
	}
}