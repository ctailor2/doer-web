import {
    getRootResourcesRequest,
    watchGetRootResourcesRequest,
    getBaseResourcesRequest,
    watchGetBaseResourcesRequest,
    getTodoResourcesRequest,
    watchGetTodoResourcesRequest,
    getHistoryResourcesRequest,
    watchGetHistoryResourcesRequest
} from '../resourcesSaga';
import {fetchData} from '../sagaHelper';
import {call, put} from 'redux-saga/effects';
import {takeEvery} from 'redux-saga';
import {ActionTypes} from '../../constants/actionTypes';

describe('getRootResourcesRequest', () => {
	let iterator;

	let link = {href: 'http://some.api/someLink'};
    let action = {
        type: 'GET_ROOT_RESOURCES_REQUEST_ACTION',
        link: link
    };

	beforeEach(() => {
		iterator = getRootResourcesRequest(action);
        localStorage.setItem('sessionToken', 'socooltoken');
	});

    it('calls endpoint with action url', () => {
        expect(iterator.next().value).toEqual(call(fetchData, link.href, {headers: {'Session-Token': 'socooltoken'}}));
    });

    describe('on request success', () => {
        let todosLink = {href: "http://some.api/todos"};
        let links = {self: {href: "http://some.api/home"}, todos: todosLink};
        let response = {response: {data: {_links: links}}};

        it('fires store links action', () => {
            iterator.next();
            expect(iterator.next(response).value).toEqual(put({type: ActionTypes.STORE_LINKS_ACTION, links: links}));
        });
    });
});

describe('watchGetRootResourcesRequest', () => {
	let iterator = watchGetRootResourcesRequest();

	it('calls get root resources request saga with latest get home resources request action action', () => {
		expect(iterator.next().value).toEqual(takeEvery('GET_ROOT_RESOURCES_REQUEST_ACTION', getRootResourcesRequest).next().value);
	});
});

describe('getBaseResourcesRequest', () => {
	let iterator;

	beforeEach(() => {
		iterator = getBaseResourcesRequest();
	});

    it('calls base resources endpoint', () => {
        expect(iterator.next().value).toEqual(call(fetchData, '/v1/resources/base'));
    });

    describe('on request success', () => {
        it('fires store links action', () => {
            iterator.next();
            let links = {
                something: {href: "tisket"},
                somethingElse: {href: "tasket"}
            };
            expect(iterator.next({response: {data: {_links: links}}}).value)
                .toEqual(put({type: ActionTypes.STORE_LINKS_ACTION, links: links}));
        });
    });
});

describe('watchGetBaseResourcesRequest', () => {
	let iterator = watchGetBaseResourcesRequest();

	it('calls get base resources request saga with latest get base resources request action action', () => {
		expect(iterator.next().value).toEqual(takeEvery('GET_BASE_RESOURCES_REQUEST_ACTION', getBaseResourcesRequest).next().value);
	});
});

describe('getTodoResourcesRequest', () => {
	let iterator;

	let link = {href: 'http://some.api/someLink'};
    let action = {
        type: 'GET_TODO_RESOURCES_REQUEST_ACTION',
        link: link
    };

	beforeEach(() => {
		iterator = getTodoResourcesRequest(action);
        localStorage.setItem('sessionToken', 'socooltoken');
	});

    it('calls endpoint with action url', () => {
        expect(iterator.next().value).toEqual(call(fetchData, link.href, {headers: {'Session-Token': 'socooltoken'}}));
    });

    describe('on request success', () => {
        let todosLink = {href: "http://some.api/todos"};
        let links = {self: {href: "http://some.api/home"}, todos: todosLink};
        let response = {response: {data: {_links: links}}};

        it('fires store links action', () => {
            iterator.next();
            expect(iterator.next(response).value).toEqual(put({type: ActionTypes.STORE_LINKS_ACTION, links: links}));
        });
    });
});

describe('watchGetTodoResourcesRequest', () => {
	let iterator = watchGetTodoResourcesRequest();

	it('calls get todo resources request saga with latest get todo resources request action action', () => {
		expect(iterator.next().value).toEqual(takeEvery('GET_TODO_RESOURCES_REQUEST_ACTION', getTodoResourcesRequest).next().value);
	});
});

describe('getHistoryResourcesRequest', () => {
	let iterator;

	let link = {href: 'http://some.api/someLink'};
    let action = {
        type: 'GET_HISTORY_RESOURCES_REQUEST_ACTION',
        link: link
    };

	beforeEach(() => {
		iterator = getHistoryResourcesRequest(action);
        localStorage.setItem('sessionToken', 'socooltoken');
	});

    it('calls endpoint with action url', () => {
        expect(iterator.next().value).toEqual(call(fetchData, link.href, {headers: {'Session-Token': 'socooltoken'}}));
    });

    describe('on request success', () => {
        let todosLink = {href: "http://some.api/todos"};
        let links = {self: {href: "http://some.api/home"}, completedTodos: todosLink};
        let response = {response: {data: {_links: links}}};

        it('fires store links action', () => {
            iterator.next();
            expect(iterator.next(response).value).toEqual(put({type: ActionTypes.STORE_LINKS_ACTION, links: links}));
        });
    });
});

describe('watchGetHistoryResourcesRequest', () => {
	let iterator = watchGetHistoryResourcesRequest();

	it('calls get history resources request saga with latest get history resources request action action', () => {
		expect(iterator.next().value).toEqual(takeEvery('GET_HISTORY_RESOURCES_REQUEST_ACTION', getHistoryResourcesRequest).next().value);
	});
});