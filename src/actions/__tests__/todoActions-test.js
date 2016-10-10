jest.unmock('../todoActions');

import {getTodosRequestAction, storeTodosAction} from '../todoActions';

describe('getTodosRequestAction', () => {
	it('creates a get todos request action', () => {
		expect(getTodosRequestAction()).toEqual({
			type: 'GET_TODOS_REQUEST_ACTION'
		});
	});
});

describe('storeTodosAction', () => {
	it('creates a store todos action with empty todos by default', () => {
		expect(storeTodosAction()).toEqual({
			type: 'STORE_TODOS_ACTION',
			todos: []
		});
	});

	it('creates a store todos action with supplied todos', () => {
		expect(storeTodosAction([1, 2, 3])).toEqual({
			type: 'STORE_TODOS_ACTION',
			todos: [1, 2, 3]
		});
	});
});