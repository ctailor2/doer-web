jest.unmock('../todoSaga');
jest.unmock('../sessionSaga');
jest.unmock('../../actions/todoActions');

import {takeEvery} from 'redux-saga';
import {call, put} from 'redux-saga/effects';
import {watchGetTodosRequest, getTodosRequest, watchCreateTodoRequest, createTodoRequest} from '../todoSaga';
import {fetchData, postData} from '../sagaHelper'

describe('getTodosRequest', () => {
	let iterator;

	beforeEach(() => {
        localStorage.getItem = jest.fn(() => {return 'socooltoken'});
	});

	describe('for todos scheduled anytime', () => {
		beforeEach(() => {
			iterator = getTodosRequest({type: 'GET_TODOS_REQUEST_ACTION', scheduling: 'anytime'});
		});

		it('calls get todos endpoint with matching scheduling', () => {
	        expect(iterator.next().value).toEqual(call(fetchData, '/v1/todos?scheduling=anytime', {headers: {'Session-Token': 'socooltoken'}}));
		});

		it('fires store todos action with matching scheduling', () => {
            iterator.next();
            expect(iterator.next({response: {data: [1, 2, 3]}}).value)
                .toEqual(put({type: 'STORE_TODOS_ACTION', todos: [1, 2, 3], scheduling: 'anytime'}));
        });
	});
	describe('for postponed scheduled todos', () => {
		beforeEach(() => {
			iterator = getTodosRequest({type: 'GET_TODOS_REQUEST_ACTION', scheduling: 'later'});
		});

		it('calls get todos endpoint with matching scheduling', () => {
	        expect(iterator.next().value).toEqual(call(fetchData, '/v1/todos?scheduling=later', {headers: {'Session-Token': 'socooltoken'}}));
		});

		it('fires store todos action with matching scheduling', () => {
            iterator.next();
            expect(iterator.next({response: {data: [1, 2, 3]}}).value)
                .toEqual(put({type: 'STORE_TODOS_ACTION', todos: [1, 2, 3], scheduling: 'later'}));
        });
	});
	describe('for immediately scheduled todos', () => {
		beforeEach(() => {
            iterator = getTodosRequest({type: 'GET_TODOS_REQUEST_ACTION', scheduling: 'now'});
        });

		it('calls get todos endpoint with matching scheduling', () => {
	        expect(iterator.next().value).toEqual(call(fetchData, '/v1/todos?scheduling=now', {headers: {'Session-Token': 'socooltoken'}}));
		});

		it('fires store todos action with matching scheduling', () => {
            iterator.next();
            expect(iterator.next({response: {data: [1, 2, 3]}}).value)
                .toEqual(put({type: 'STORE_TODOS_ACTION', todos: [1, 2, 3], scheduling: 'now'}));
        });
	});
});

describe('createTodoRequest', () => {
	let todo = {task: 'task', scheduling: 'now'};
	let action = {type: 'CREATE_TODO_REQUEST_ACTION', todo: todo};
	let iterator;

	beforeEach(() => {
		iterator = createTodoRequest(action);
	});

	it('calls create todo endpoint with the todo', () => {
		expect(iterator.next().value).toEqual(call(postData, '/v1/todos', todo, {headers: {'Session-Token': 'socooltoken'}}));
	});

	it('fires get todos action for the same scheduling as the todo on success', () => {
		iterator.next();
		expect(iterator.next({response: {}}).value).toEqual(put({type: 'GET_TODOS_REQUEST_ACTION', scheduling: 'now'}));
	});
});

describe('watchGetTodosRequest', () => {
	let iterator = watchGetTodosRequest();

	it('calls get todos request saga with every get todos request action', () => {
		expect(iterator.next().value).toEqual(takeEvery('GET_TODOS_REQUEST_ACTION', getTodosRequest).next().value);
	});
});

describe('watchCreateTodoRequest', () => {
	let iterator = watchCreateTodoRequest();

	it('calls create todo request saga with every create todo request action', () => {
		expect(iterator.next().value).toEqual(takeEvery('CREATE_TODO_REQUEST_ACTION', createTodoRequest).next().value);
	});
});