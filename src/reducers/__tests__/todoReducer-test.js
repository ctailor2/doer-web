jest.unmock('../todoReducer');

import {todos} from '../todoReducer';

describe('todos', () => {
	it('has initial state', () => {
		expect(todos()).toEqual([]);
	});

	it('returns the stored todos from STORE_TODOS_ACTION', () => {
		let action = {
			type: 'STORE_TODOS_ACTION',
			todos: [4, 5, 6]
		}
		expect(todos([1, 2, 3], action)).toEqual([4, 5, 6]);
	});
});
