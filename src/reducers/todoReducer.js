import * as actionTypes from '../constants/actionTypes';
import _ from 'lodash';

export function todos(state = {active: [], inactive: []}, action = {}) {
	let newState = _.clone(state);
	switch(action.type) {
		case actionTypes.STORE_TODOS_ACTION:
			let todos = {};
			[todos.active, todos.inactive] = _.partition(action.todos, function (todo) {
				return todo.scheduling === 'now';
			});
			// TODO: This complexity may be indicative of an issue using the API
			// TODO: Constantize or Enumify the scheduling types
			switch(action.scheduling) {
				case 'anytime':
					newState.active = todos.active;
					newState.inactive = todos.inactive;
					break;
				case 'now':
					newState.active = todos.active;
					break;
				case 'later':
					newState.inactive = todos.inactive;
					break;
				default:
					break;
			}
			return newState;
		default:
			return newState;
	}
}