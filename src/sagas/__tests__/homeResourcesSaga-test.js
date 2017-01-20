jest.unmock('../homeResourcesSaga');
jest.unmock('../../actions/linkActions');

import {getHomeResourcesRequest, watchGetHomeResourcesRequest} from '../homeResourcesSaga';
import {fetchData} from '../sagaHelper';
import {call, put} from 'redux-saga/effects';
import {takeEvery} from 'redux-saga';

describe('getHomeResourcesRequest', () => {
	let iterator;

	let url = 'http://some.api/someLink';
    let action = {
        type: 'GET_HOME_RESOURCES_REQUEST_ACTION',
        link: {href: url}
    };

	beforeEach(() => {
		iterator = getHomeResourcesRequest(action);
        localStorage.getItem = jest.fn(() => {return 'socooltoken'});
	});

    it('calls endpoint with action href', () => {
        expect(iterator.next().value).toEqual(call(fetchData, url, {headers: {'Session-Token': 'socooltoken'}}));
    });

    describe('on request success', () => {
        it('fires store links action', () => {
            iterator.next();
            let links = [{rel: "this", href: "tisket"}, {rel: "that", href: "tasket"}];
            expect(iterator.next({response: {data: {_links: links}}}).value)
                .toEqual(put({type: 'STORE_LINKS_ACTION', links: links}));
        });
    });
});

describe('watchGetHomeResourcesRequest', () => {
	let iterator = watchGetHomeResourcesRequest();

	it('calls get home resources request saga with latest get home resources request action action', () => {
		expect(iterator.next().value).toEqual(takeEvery('GET_HOME_RESOURCES_REQUEST_ACTION', getHomeResourcesRequest).next().value);
	});
});