jest.unmock('../todoActions');

import {
	getTodosRequestAction,
	getCompletedTodosRequestAction,
	storeTodosAction,
	storeCompletedTodosAction,
	createTodoRequestAction,
	deleteTodoRequestAction,
	displaceTodoRequestAction,
	updateTodoRequestAction,
	completeTodoRequestAction,
	moveTodoRequestAction,
	pullTodosRequestAction
} from '../todoActions';

describe('getTodosRequestAction', () => {
	it('creates a get todos request action with empty link by default', () => {
		expect(getTodosRequestAction()).toEqual({
			type: 'GET_TODOS_REQUEST_ACTION',
			link: {}
		});
	});

	it('creates a get todos request action with supplied link', () => {
		let link = {href: 'http://some.api/todos'};
		expect(getTodosRequestAction(link)).toEqual({
			type: 'GET_TODOS_REQUEST_ACTION',
			link: link
		});
	});
});

describe('getCompletedTodosRequestAction', () => {
	it('creates a get completed todos request action with empty link by default', () => {
		expect(getCompletedTodosRequestAction()).toEqual({
			type: 'GET_COMPLETED_TODOS_REQUEST_ACTION',
			link: {}
		});
	});

	it('creates a get completed todos request action with supplied link', () => {
		let link = {href: 'http://some.api/todos'};
		expect(getCompletedTodosRequestAction(link)).toEqual({
			type: 'GET_COMPLETED_TODOS_REQUEST_ACTION',
			link: link
		});
	});
});

describe('storeTodosAction', () => {
	it('creates a store todos action with empty todos and anytime scheduling by default', () => {
		expect(storeTodosAction()).toEqual({
			type: 'STORE_TODOS_ACTION',
			todos: [],
			scheduling: 'anytime'
		});
	});

	it('creates a store todos action with supplied todos and scheduling', () => {
		expect(storeTodosAction([1, 2, 3], 'someScheduling')).toEqual({
			type: 'STORE_TODOS_ACTION',
			todos: [1, 2, 3],
			scheduling: 'someScheduling'
		});
	});
});

describe('storeCompletedTodosAction', () => {
	it('creates a store completed todos action with empty todos by default', () => {
		expect(storeCompletedTodosAction()).toEqual({
			type: 'STORE_COMPLETED_TODOS_ACTION',
			todos: []
		});
	});

	it('creates a store completed todos action with supplied todos', () => {
		expect(storeCompletedTodosAction([1, 2, 3])).toEqual({
			type: 'STORE_COMPLETED_TODOS_ACTION',
			todos: [1, 2, 3]
		});
	});
});

describe('createTodoRequestAction', () => {
	it('creates a create todo request action with empty link and todo by default', () => {
		expect(createTodoRequestAction()).toEqual({
			type: 'CREATE_TODO_REQUEST_ACTION',
			link: {},
			todo: {}
		});
	});

	it('creates a create todo request action with supplied link and todo', () => {
		let link = {href: 'http://some.api/todo'};
		let todo = {a: 1, b: 2};
		expect(createTodoRequestAction(link, todo)).toEqual({
			type: 'CREATE_TODO_REQUEST_ACTION',
			link: link,
			todo: todo
		});
	});
});

describe('deleteTodoRequestAction', () => {
	it('creates a delete todo request action with empty link by default', () => {
		expect(deleteTodoRequestAction()).toEqual({
			type: 'DELETE_TODO_REQUEST_ACTION',
			link: {}
		});
	});

	it('creates a delete todo request action with supplied link', () => {
		let link = {href: 'http://some.api/deleteTodo'}
		expect(deleteTodoRequestAction(link)).toEqual({
            type: 'DELETE_TODO_REQUEST_ACTION',
            link: link
        });
	});
});

describe('displaceTodoRequestAction', () => {
	it('creates a displace todo request action with empty link and todo by default', () => {
		expect(displaceTodoRequestAction()).toEqual({
			type: 'DISPLACE_TODO_REQUEST_ACTION',
			link: {},
			todo: {}
		});
	});

	it('creates a displace todo request action with supplied link and todo', () => {
		let link = {href: 'http://some.api/displaceTodo'}
        let todo = {a: 1, b: 2};
		expect(displaceTodoRequestAction(link, todo)).toEqual({
            type: 'DISPLACE_TODO_REQUEST_ACTION',
            link: link,
            todo: todo
        });
	});
});

describe('updateTodoRequestAction', () => {
	it('creates a update todo request action with empty link and todo by default', () => {
		expect(updateTodoRequestAction()).toEqual({
			type: 'UPDATE_TODO_REQUEST_ACTION',
			link: {},
			todo: {}
		});
	});

	it('creates a update todo request action with supplied link and todo', () => {
		let link = {href: 'http://some.api/todo'};
		let todo = {a: 1, b: 2};
		expect(updateTodoRequestAction(link, todo)).toEqual({
			type: 'UPDATE_TODO_REQUEST_ACTION',
			link: link,
			todo: todo
		});
	});
});

describe('completeTodoRequestAction', () => {
	it('creates a complete todo request action with empty link by default', () => {
		expect(completeTodoRequestAction()).toEqual({
			type: 'COMPLETE_TODO_REQUEST_ACTION',
			link: {}
		});
	});

	it('creates a complete todo request action with supplied link', () => {
		let link = {href: 'http://some.api/completeTodo'}
		expect(completeTodoRequestAction(link)).toEqual({
            type: 'COMPLETE_TODO_REQUEST_ACTION',
            link: link
        });
	});
});

describe('moveTodoRequestAction', () => {
	it('creates a move todo request action with empty link by default', () => {
		expect(moveTodoRequestAction()).toEqual({
			type: 'MOVE_TODO_REQUEST_ACTION',
			link: {}
		});
	});

	it('creates a move todo request action with supplied link', () => {
		let link = {href: 'http://some.api/moveTodo'}
		expect(moveTodoRequestAction(link)).toEqual({
            type: 'MOVE_TODO_REQUEST_ACTION',
            link: link
        });
	});
});

describe('pullTodosRequestAction', () => {
	it('creates a move todo request action with empty link by default', () => {
		expect(pullTodosRequestAction()).toEqual({
			type: 'PULL_TODOS_REQUEST_ACTION',
			link: {}
		});
	});

	it('creates a move todo request action with supplied link', () => {
		let link = {href: 'http://some.api/pullTodos'}
		expect(pullTodosRequestAction(link)).toEqual({
            type: 'PULL_TODOS_REQUEST_ACTION',
            link: link
        });
	});
});