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
		iterator = getTodosRequest();
	});

	it('calls get todos endpoint', () => {
        expect(iterator.next().value).toEqual(call(fetchData, '/v1/todos', {headers: {'Session-Token': 'socooltoken'}}));
	});

	describe('on request success', () => {
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