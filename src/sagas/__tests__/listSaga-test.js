import _ from 'lodash';
import {takeEvery} from 'redux-saga';
import {call, put} from 'redux-saga/effects';
import {
	watchGetListRequest,
	getListRequest,
	unlockListRequest,
	watchUnlockListRequest
} from '../listSaga';
import {fetchData, postData} from '../sagaHelper';

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

    describe('when there is a deferredTodos link', () => {
    	it('fires get todos request action with todos link', () => {
            let fullLinks = _.clone(links);
            let deferredTodosLink = {href: 'deferredTodos'};
            fullLinks.deferredTodos = deferredTodosLink;
            iterator.next();
            iterator.next({response: {data: {list: {_links: fullLinks}}}});
            iterator.next({response: {data: {list: {_links: fullLinks}}}});
            expect(iterator.next({response: {data: {list: {_links: fullLinks}}}}).value)
                .toEqual(put({type: 'GET_DEFERRED_TODOS_REQUEST_ACTION', link: deferredTodosLink}));
    	});
    });

    describe('when there is not a deferredTodos link', () => {
    	it('does not fire a get todos request action with todos link', () => {
            iterator.next();
            iterator.next({response: {data: {list: {_links: links}}}});
            iterator.next({response: {data: {list: {_links: links}}}});
            expect(iterator.next({response: {data: {list: {_links: links}}}}).value).toBeUndefined();
    	});
    });
});

describe('watchGetListRequest', () => {
	let iterator = watchGetListRequest();

	it('calls get list request saga with every get list request action', () => {
		expect(iterator.next().value).toEqual(takeEvery('GET_LIST_REQUEST_ACTION', getListRequest).next().value);
	});
});

describe('unlockListRequest', () => {
	let iterator;

	let url = 'http://some.api/someLink';
    let action = {
        type: 'UNLOCK_LIST_REQUEST_ACTION',
        link: {href: url}
    };
    let todosLink = {href: "tisket"};
    let links = {
        todos: todosLink,
        somethingElse: {href: "tasket"}
    };

	beforeEach(() => {
        localStorage.getItem = jest.fn(() => {return 'socooltoken'});
		iterator = unlockListRequest(action);
	});

	it('calls endpoint with action href', () => {
        expect(iterator.next().value).toEqual(call(postData, url, null, {headers: {'Session-Token': 'socooltoken'}}));
	});

	it('fires get list request action with link from response', () => {
	    let listLink = {href: 'http://some.api/someLink'}
        iterator.next();
        expect(iterator.next({response: {data: {_links: {list: listLink}}}}).value)
            .toEqual(put({type: 'GET_LIST_REQUEST_ACTION', link: listLink}));
    });
});

describe('watchUnlockListRequest', () => {
	let iterator = watchUnlockListRequest();

	it('calls unlock list request saga with every unlock list request action', () => {
		expect(iterator.next().value).toEqual(takeEvery('UNLOCK_LIST_REQUEST_ACTION', unlockListRequest).next().value);
	});
});
