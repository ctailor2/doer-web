jest.unmock('../todoSaga');
jest.unmock('../sessionSaga');
jest.unmock('../../actions/todoActions');

import {takeEvery} from 'redux-saga';
import {call, put} from 'redux-saga/effects';
import {watchGetTodosRequest, getTodosRequest} from '../todoSaga';
import {fetchData} from '../sagaHelper'

describe('getTodosRequest', () => {
	let iterator;

	beforeEach(() => {
        localStorage.getItem = jest.fn(() => {return 'socooltoken'});
	});

	describe('for todos scheduled anytime', () => {
		beforeEach(() => {
			iterator = getTodosRequest({type: 'GET_TODOS_REQUEST_ACTION', scheduling: 'anytime'});
		});

		it('calls get todos endpoint with "anytime" scheduling', () => {
	        expect(iterator.next().value).toEqual(call(fetchData, '/v1/todos?scheduling=anytime', {headers: {'Session-Token': 'socooltoken'}}));
		});
	});
	describe('for postponed scheduled todos', () => {
		beforeEach(() => {
			iterator = getTodosRequest({type: 'GET_TODOS_REQUEST_ACTION', scheduling: 'later'});
		});

		it('calls get todos endpoint with "later" scheduling', () => {
	        expect(iterator.next().value).toEqual(call(fetchData, '/v1/todos?scheduling=later', {headers: {'Session-Token': 'socooltoken'}}));
		});
	});
	describe('for immediately scheduled todos', () => {
		beforeEach(() => {
            iterator = getTodosRequest({type: 'GET_TODOS_REQUEST_ACTION', scheduling: 'now'});
        });

		it('calls get todos endpoint with "now" scheduling', () => {
	        expect(iterator.next().value).toEqual(call(fetchData, '/v1/todos?scheduling=now', {headers: {'Session-Token': 'socooltoken'}}));
		});
	});

	describe('on request success', () => {
		beforeEach(() => {
            iterator = getTodosRequest({type: 'GET_TODOS_REQUEST_ACTION', scheduling: 'now'});
        });

		it('fires store todos action', () => {
			iterator.next();
			expect(iterator.next({response: {data: [1, 2, 3]}}).value)
				.toEqual(put({type: 'STORE_TODOS_ACTION', todos: [1, 2, 3]}));
		});
	});
});

describe('watchGetTodosRequest', () => {
	let iterator = watchGetTodosRequest();

	it('calls get todos request saga with every get todos request action', () => {
		expect(iterator.next().value).toEqual(takeEvery('GET_TODOS_REQUEST_ACTION', getTodosRequest).next().value);
	});
});