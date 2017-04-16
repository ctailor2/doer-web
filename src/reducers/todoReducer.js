import * as actionTypes from '../constants/actionTypes';
import _ from 'lodash';

export function todos(state = {active: [], inactive: [], completed: []}, action = {}) {
	let newState = _.clone(state);
	switch(action.type) {
		case actionTypes.STORE_TODOS_ACTION:
			// TODO: Constantize or Enumify the scheduling types
			switch(action.scheduling) {
				case 'now':
					newState.active = action.todos;
					break;
				case 'later':
					newState.inactive = action.todos;
					break;
				default:
					break;
			}
			return newState;
		case actionTypes.STORE_COMPLETED_TODOS_ACTION:
			newState.completed = _.map(action.todos, (todo) => {
				return {task: todo.task, completedAt: new Date(Date.parse(todo.completedAt))}
			});
			return newState;
		default:
			return newState;
	}
}