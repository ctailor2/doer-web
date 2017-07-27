jest.unmock('../listSaga');
jest.unmock('../../actions/listActions');
jest.unmock('../../actions/todoActions');

import {takeEvery} from 'redux-saga';
import {call, put} from 'redux-saga/effects';
import {
	watchGetListRequest,
	getListRequest
} from '../listSaga';
import {fetchData} from '../sagaHelper'

describe('getListRequest', () => {
	let iterator;

	let url = 'http://some.api/someLink';
    let action = {
        type: 'GET_LIST_REQUEST_ACTION',
        link: {href: url}
    };
    let todosLink = {href: "tisket"};
    let links = {
        todos: todosLink,
        somethingElse: {href: "tasket"}
    };

	beforeEach(() => {
        localStorage.getItem = jest.fn(() => {return 'socooltoken'});
		iterator = getListRequest(action);
	});

	it('calls endpoint with action href', () => {
        expect(iterator.next().value).toEqual(call(fetchData, url, {headers: {'Session-Token': 'socooltoken'}}));
	});

	it('fires store list action with list from response', () => {
        iterator.next();
        expect(iterator.next({response: {data: {list: {someProperty: 'someValue'}}}}).value)
            .toEqual(put({type: 'STORE_LIST_ACTION', list: {someProperty: 'someValue'}}));
    });

	it('fires get todos request action with todos link', () => {
        iterator.next();
        iterator.next({response: {data: {list: {_links: links}}}});
        expect(iterator.next({response: {data: {list: {_links: links}}}}).value)
            .toEqual(put({type: 'GET_TODOS_REQUEST_ACTION', link: todosLink}));
    });
});

describe('watchGetListRequest', () => {
	let iterator = watchGetListRequest();

	it('calls get list request saga with every get list request action', () => {
		expect(iterator.next().value).toEqual(takeEvery('GET_LIST_REQUEST_ACTION', getListRequest).next().value);
	});
});
