jest.unmock('../homeResourcesSaga');
jest.unmock('../../actions/todoActions');

import {getHomeResourcesRequest, watchGetHomeResourcesRequest} from '../homeResourcesSaga';
import {fetchData} from '../sagaHelper';
import {call, put} from 'redux-saga/effects';
import {takeEvery} from 'redux-saga';

describe('getHomeResourcesRequest', () => {
	let iterator;

	let url = 'http://some.api/someLink';
    let action = {
        type: 'GET_HOME_RESOURCES_REQUEST_ACTION',
        url: url
    };

	beforeEach(() => {
		iterator = getHomeResourcesRequest(action);
        localStorage.getItem = jest.fn(() => {return 'socooltoken'});
	});

    it('calls endpoint with action url', () => {
        expect(iterator.next().value).toEqual(call(fetchData, url, {headers: {'Session-Token': 'socooltoken'}}));
    });

    describe('on request success', () => {
        let todosLink = {href: "http://some.api/todos"};
        let links = {self: {href: "http://some.api/home"}, todos: todosLink};
        let response = {response: {data: {_links: links}}};

        it('calls get todos request action', () => {
            iterator.next();
            expect(iterator.next(response).value).toEqual(put({type: 'GET_TODOS_REQUEST_ACTION', link: todosLink}));
        });
    });
});

describe('watchGetHomeResourcesRequest', () => {
	let iterator = watchGetHomeResourcesRequest();

	it('calls get home resources request saga with latest get home resources request action action', () => {
		expect(iterator.next().value).toEqual(takeEvery('GET_HOME_RESOURCES_REQUEST_ACTION', getHomeResourcesRequest).next().value);
	});
});