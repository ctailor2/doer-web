import {todos} from '../todoReducer';

describe('todos', () => {
	it('has initial state', () => {
		expect(todos()).toEqual({completed: []});
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
