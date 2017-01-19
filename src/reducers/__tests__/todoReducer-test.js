jest.unmock('../todoReducer');

import {todos} from '../todoReducer';

describe('todos', () => {
	it('has initial state', () => {
		expect(todos()).toEqual({active: [], inactive: []});
	});

	describe('when action scheduling is anytime', () => {
		it('returns the todos from STORE_TODOS_ACTION separated by their scheduling property', () => {
			let action = {
				type: 'STORE_TODOS_ACTION',
				todos: [
					{task: 'this', scheduling: 'now'},
					{task: 'that', scheduling: 'later'},
					{task: 'other', scheduling: 'now'}
				],
				scheduling: 'anytime'
			}
			let todosState = todos({
				inactive: [{task: 'one', scheduling: 'later'}]
			}, action);
	        expect(todosState.active).toContain({task: 'this', scheduling: 'now'}, {task: 'other', scheduling: 'now'});
	        expect(todosState.inactive).toContain({task: 'that', scheduling: 'later'});
	        expect(todosState.inactive).not.toContain({task: 'one', scheduling: 'later'});
		});
	});

	describe('when action scheduling is now', () => {
		it('returns the existing todos scheduled for later and the todos from the STORE_TODOS_ACTION separated by their scheduling property', () => {
			let action = {
				type: 'STORE_TODOS_ACTION',
				todos: [
					{task: 'this', scheduling: 'now'},
					{task: 'that', scheduling: 'later'},
					{task: 'other', scheduling: 'now'}
				],
				scheduling: 'now'
			}
			let todosState = todos({
				inactive: [{task: 'one', scheduling: 'later'}]
			}, action);
	        expect(todosState.active).toContain({task: 'this', scheduling: 'now'}, {task: 'other', scheduling: 'now'});
	        expect(todosState.inactive).not.toContain({task: 'that', scheduling: 'later'});
	        expect(todosState.inactive).toContain({task: 'one', scheduling: 'later'});
		});
	});

	describe('when action scheduling is later', () => {
		it('returns the existing todos scheduled for now and the todos from the STORE_TODOS_ACTION separated by their scheduling property', () => {
			let action = {
				type: 'STORE_TODOS_ACTION',
				todos: [
					{task: 'this', scheduling: 'now'},
					{task: 'that', scheduling: 'later'},
					{task: 'other', scheduling: 'now'}
				],
				scheduling: 'later'
			}
			let todosState = todos({
				active: [{task: 'one', scheduling: 'now'}]
			}, action);
	        expect(todosState.active).toContain({task: 'one', scheduling: 'now'});
	        expect(todosState.inactive).toContain({task: 'that', scheduling: 'later'});
		});
	});
});
