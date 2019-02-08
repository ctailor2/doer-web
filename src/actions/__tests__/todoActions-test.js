import {
	createTodoRequestAction,
	deleteTodoRequestAction,
	displaceTodoRequestAction,
	updateTodoRequestAction,
	completeTodoRequestAction,
	moveTodoRequestAction,
	pullTodosRequestAction,
	escalateTodosRequestAction
} from '../todoActions';
import {ActionTypes} from '../../constants/actionTypes'

describe('createTodoRequestAction', () => {
	it('creates a create todo request action with empty link and todo by default', () => {
		expect(createTodoRequestAction()).toEqual({
			type: ActionTypes.CREATE_TODO_REQUEST_ACTION,
			link: {},
			todo: {}
		});
	});

	it('creates a create todo request action with supplied link and todo', () => {
		let link = {href: 'http://some.api/todo'};
		let todo = {a: 1, b: 2};
		expect(createTodoRequestAction(link, todo)).toEqual({
			type: ActionTypes.CREATE_TODO_REQUEST_ACTION,
			link: link,
			todo: todo
		});
	});
});

describe('deleteTodoRequestAction', () => {
	it('creates a delete todo request action with empty link by default', () => {
		expect(deleteTodoRequestAction()).toEqual({
			type: ActionTypes.DELETE_TODO_REQUEST_ACTION,
			link: {}
		});
	});

	it('creates a delete todo request action with supplied link', () => {
		let link = {href: 'http://some.api/deleteTodo'}
		expect(deleteTodoRequestAction(link)).toEqual({
            type: ActionTypes.DELETE_TODO_REQUEST_ACTION,
            link: link
        });
	});
});

describe('displaceTodoRequestAction', () => {
	it('creates a displace todo request action with empty link and todo by default', () => {
		expect(displaceTodoRequestAction()).toEqual({
			type: ActionTypes.DISPLACE_TODO_REQUEST_ACTION,
			link: {},
			todo: {}
		});
	});

	it('creates a displace todo request action with supplied link and todo', () => {
		let link = {href: 'http://some.api/displaceTodo'}
        let todo = {a: 1, b: 2};
		expect(displaceTodoRequestAction(link, todo)).toEqual({
            type: ActionTypes.DISPLACE_TODO_REQUEST_ACTION,
            link: link,
            todo: todo
        });
	});
});

describe('updateTodoRequestAction', () => {
	it('creates a update todo request action with empty link and todo by default', () => {
		expect(updateTodoRequestAction()).toEqual({
			type: ActionTypes.UPDATE_TODO_REQUEST_ACTION,
			link: {},
			todo: {}
		});
	});

	it('creates a update todo request action with supplied link and todo', () => {
		let link = {href: 'http://some.api/todo'};
		let todo = {a: 1, b: 2};
		expect(updateTodoRequestAction(link, todo)).toEqual({
			type: ActionTypes.UPDATE_TODO_REQUEST_ACTION,
			link: link,
			todo: todo
		});
	});
});

describe('completeTodoRequestAction', () => {
	it('creates a complete todo request action with empty link by default', () => {
		expect(completeTodoRequestAction()).toEqual({
			type: ActionTypes.COMPLETE_TODO_REQUEST_ACTION,
			link: {}
		});
	});

	it('creates a complete todo request action with supplied link', () => {
		let link = {href: 'http://some.api/completeTodo'}
		expect(completeTodoRequestAction(link)).toEqual({
            type: ActionTypes.COMPLETE_TODO_REQUEST_ACTION,
            link: link
        });
	});
});

describe('moveTodoRequestAction', () => {
	it('creates a move todo request action with empty link by default', () => {
		expect(moveTodoRequestAction()).toEqual({
			type: ActionTypes.MOVE_TODO_REQUEST_ACTION,
			link: {}
		});
	});

	it('creates a move todo request action with supplied link', () => {
		let link = {href: 'http://some.api/moveTodo'}
		expect(moveTodoRequestAction(link)).toEqual({
            type: ActionTypes.MOVE_TODO_REQUEST_ACTION,
            link: link
        });
	});
});

describe('pullTodosRequestAction', () => {
	it('creates a move todo request action with empty link by default', () => {
		expect(pullTodosRequestAction()).toEqual({
			type: ActionTypes.PULL_TODOS_REQUEST_ACTION,
			link: {}
		});
	});

	it('creates a move todo request action with supplied link', () => {
		let link = {href: 'http://some.api/pullTodos'}
		expect(pullTodosRequestAction(link)).toEqual({
            type: ActionTypes.PULL_TODOS_REQUEST_ACTION,
            link: link
        });
	});
});

describe('escalateTodosRequestAction', () => {
	it('creates a escalate todo request action with empty link by default', () => {
		expect(escalateTodosRequestAction()).toEqual({
			type: ActionTypes.ESCALATE_TODOS_REQUEST_ACTION,
			link: {}
		});
	});

	it('creates a escalate todo request action with supplied link', () => {
		let link = {href: 'http://some.api/escalateTodos'}
		expect(escalateTodosRequestAction(link)).toEqual({
            type: ActionTypes.ESCALATE_TODOS_REQUEST_ACTION,
            link: link
        });
	});
});