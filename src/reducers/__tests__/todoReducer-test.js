jest.unmock('../todoReducer');

import {todos} from '../todoReducer';

describe('todos', () => {
	it('has initial state', () => {
		expect(todos()).toEqual({active: [], inactive: []});
	});

	it('returns the todos from STORE_TODOS_ACTION separated by their active property', () => {
		let action = {
			type: 'STORE_TODOS_ACTION',
			todos: [
				{task: 'this', scheduling: 'now'},
				{task: 'that', scheduling: 'later'},
				{task: 'other', scheduling: 'now'}
			]
		}
		let todosState = todos([
            {task: 'one', scheduling: 'later'}
        ], action);
        expect(todosState.active).toContain({task: 'this', scheduling: 'now'}, {task: 'other', scheduling: 'now'});
        expect(todosState.inactive).toContain({task: 'that', scheduling: 'later'});
        expect(todosState.inactive).not.toContain({task: 'one', scheduling: 'later'});
	});
});
