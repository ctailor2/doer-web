import * as actionTypes from '../constants/actionTypes';

export function todos(state = [], action = {}) {
	switch(action.type) {
		case actionTypes.STORE_TODOS_ACTION:
			return action.todos;
		default:
			return state;
	}
}