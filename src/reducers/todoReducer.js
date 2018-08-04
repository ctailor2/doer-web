import * as actionTypes from '../constants/actionTypes';
import _ from 'lodash';

export function todos(state = {completed: []}, action = {}) {
	let newState = _.clone(state);
	switch(action.type) {
		case actionTypes.STORE_COMPLETED_TODOS_ACTION:
			newState.completed = _.map(action.todos, (todo) => {
				return {task: todo.task, completedAt: new Date(Date.parse(todo.completedAt))}
			});
            break;
		default:
			return newState;
	}
    return newState;
}