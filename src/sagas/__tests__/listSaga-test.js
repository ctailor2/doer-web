import _ from 'lodash';
import {takeEvery} from 'redux-saga';
import {call, put} from 'redux-saga/effects';
import {
	watchGetListRequest,
	getListRequest,
	watchGetCompletedListRequest,
	getCompletedListRequest,
	unlockListRequest,
	watchUnlockListRequest
} from '../listSaga';
import {fetchData, postData} from '../sagaHelper';
import {ActionTypes} from '../../constants/actionTypes';

describe('getListRequest', () => {
	let iterator;

	let url = 'http://some.api/someLink';
    let action = {
        type: ActionTypes.GET_LIST_REQUEST_ACTION,
        link: {href: url}
    };
    let todosLink = {href: "tisket"};
    let links = {
        todos: todosLink,
        somethingElse: {href: "tasket"}
    };

	beforeEach(() => {
        localStorage.setItem('sessionToken', 'socooltoken');
		iterator = getListRequest(action);
	});

	it('calls endpoint with action href', () => {
        expect(iterator.next().value).toEqual(call(fetchData, url, {headers: {'Session-Token': 'socooltoken'}}));
	});

	it('fires store list action with list from response', () => {
        iterator.next();
        expect(iterator.next({response: {data: {list: {someProperty: 'someValue'}}}}).value)
            .toEqual(put({type: ActionTypes.STORE_LIST_ACTION, list: {someProperty: 'someValue'}}));
    });
});

describe('watchGetListRequest', () => {
	let iterator = watchGetListRequest();

	it('calls get list request saga with every get list request action', () => {
		expect(iterator.next().value).toEqual(takeEvery(ActionTypes.GET_LIST_REQUEST_ACTION, getListRequest).next().value);
	});
});

describe('getCompletedListRequest', () => {
	let iterator;

	let url = 'http://some.api/someLink';
    let action = {
        type: ActionTypes.GET_COMPLETED_LIST_REQUEST_ACTION,
        link: {href: url}
    };
    let todosLink = {href: "tisket"};
    let links = {
        todos: todosLink,
        somethingElse: {href: "tasket"}
    };

	beforeEach(() => {
        localStorage.setItem('sessionToken', 'socooltoken');
		iterator = getCompletedListRequest(action);
	});

	it('calls endpoint with action href', () => {
        expect(iterator.next().value).toEqual(call(fetchData, url, {headers: {'Session-Token': 'socooltoken'}}));
	});

	it('fires store completed list action with list from response', () => {
        iterator.next();
        expect(iterator.next({response: {data: {list: {someProperty: 'someValue'}}}}).value)
            .toEqual(put({type: ActionTypes.STORE_COMPLETED_LIST_ACTION, list: {someProperty: 'someValue'}}));
    });
});

describe('watchGetCompletedListRequest', () => {
	let iterator = watchGetCompletedListRequest();

	it('calls get list request saga with every get list request action', () => {
		expect(iterator.next().value).toEqual(takeEvery(ActionTypes.GET_COMPLETED_LIST_REQUEST_ACTION, getCompletedListRequest).next().value);
	});
});

describe('unlockListRequest', () => {
	let iterator;

	let url = 'http://some.api/someLink';
    let action = {
        type: ActionTypes.UNLOCK_LIST_REQUEST_ACTION,
        link: {href: url}
    };
    let todosLink = {href: "tisket"};
    let links = {
        todos: todosLink,
        somethingElse: {href: "tasket"}
    };

	beforeEach(() => {
        localStorage.setItem('sessionToken', 'socooltoken');
		iterator = unlockListRequest(action);
	});

	it('calls endpoint with action href', () => {
        expect(iterator.next().value).toEqual(call(postData, url, null, {headers: {'Session-Token': 'socooltoken'}}));
	});

	it('fires get list request action with link from response', () => {
	    let listLink = {href: 'http://some.api/someLink'}
        iterator.next();
        expect(iterator.next({response: {data: {_links: {list: listLink}}}}).value)
            .toEqual(put({type: ActionTypes.GET_LIST_REQUEST_ACTION, link: listLink}));
    });
});

describe('watchUnlockListRequest', () => {
	let iterator = watchUnlockListRequest();

	it('calls unlock list request saga with every unlock list request action', () => {
		expect(iterator.next().value).toEqual(takeEvery(ActionTypes.UNLOCK_LIST_REQUEST_ACTION, unlockListRequest).next().value);
	});
});
