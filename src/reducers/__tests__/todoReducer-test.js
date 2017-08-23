import {todos} from '../todoReducer';

describe('todos', () => {
	it('has initial state', () => {
		expect(todos()).toEqual({active: [], inactive: [], completed: []});
	});

	describe('when STORE_TODOS_ACTION received', () => {
        it('stores todos from action as active', () => {
            let action = {
                type: 'STORE_TODOS_ACTION',
                todos: [
                    {task: 'this'},
                    {task: 'that'}
                ]
            }
            let todosState = todos({inactive: [{task: 'one'}]}, action);
            expect(todosState.inactive).toContainEqual({task: 'one'});
            expect(todosState.active).toContainEqual({task: 'this'}, {task: 'other'});
            expect(todosState.inactive).not.toContainEqual({task: 'this'});
            expect(todosState.inactive).not.toContainEqual({task: 'that'});
        });
    });

	describe('when STORE_DEFERRED_TODOS_ACTION received', () => {
        it('stores todos from action as inactive', () => {
            let action = {
                type: 'STORE_DEFERRED_TODOS_ACTION',
                todos: [
                    {task: 'this'},
                    {task: 'that'}
                ]
            }
            let todosState = todos({active: [{task: 'one'}]}, action);
            expect(todosState.active).toContainEqual({task: 'one'});
            expect(todosState.inactive).toContainEqual({task: 'this'}, {task: 'that'});
            expect(todosState.active).not.toContainEqual({task: 'this'});
            expect(todosState.active).not.toContainEqual({task: 'that'});
        });
	});

	describe('when a STORE_COMPLETED_TODOS_ACTION is received', () => {
		it('stores todos from action, parsing completed at datetime', () => {
            let action = {
                type: 'STORE_COMPLETED_TODOS_ACTION',
                todos: [
                    {task: 'this', completedAt: '2017-02-25T14:20:20+0000'},
                    {task: 'that', completedAt: '2017-02-23T00:15:00+0000'}
                ]
            }
            let todosState = todos({
                active: [{task: 'one', completedAt: '2017-02-20T22:50:10+0000'}]
            }, action);
            expect(todosState.completed).toContainEqual(
                {task: 'this', completedAt: new Date('2017-02-25T14:20:20+0000')},
                {task: 'that', completedAt: new Date('2017-02-23T00:15:00+0000')}
            );
        });
	});
});
