jest.unmock('../homeResourcesSaga');
jest.unmock('../../actions/linkActions');

import {getHomeResourcesRequest, watchGetHomeResourcesRequest} from '../homeResourcesSaga';
import {fetchData} from '../sagaHelper';
import {call, put} from 'redux-saga/effects';
import {takeEvery} from 'redux-saga';

describe('getHomeResourcesRequest', () => {
	let iterator;

	let link = {href: 'http://some.api/someLink'};
    let action = {
        type: 'GET_HOME_RESOURCES_REQUEST_ACTION',
        link: link
    };

	beforeEach(() => {
		iterator = getHomeResourcesRequest(action);
        localStorage.getItem = jest.fn(() => {return 'socooltoken'});
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
            expect(iterator.next(response).value).toEqual(put({type: 'STORE_LINKS_ACTION', links: links}));
        });
    });
});

describe('watchGetHomeResourcesRequest', () => {
	let iterator = watchGetHomeResourcesRequest();

	it('calls get home resources request saga with latest get home resources request action action', () => {
		expect(iterator.next().value).toEqual(takeEvery('GET_HOME_RESOURCES_REQUEST_ACTION', getHomeResourcesRequest).next().value);
	});
});