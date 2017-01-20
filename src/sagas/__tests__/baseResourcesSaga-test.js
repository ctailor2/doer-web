jest.unmock('../baseResourcesSaga');
jest.unmock('../../actions/linkActions');

import {getBaseResourcesRequest, watchGetBaseResourcesRequest} from '../baseResourcesSaga';
import {fetchData} from '../sagaHelper';
import {call, put} from 'redux-saga/effects';
import {takeEvery} from 'redux-saga';

describe('getBaseResourcesRequest', () => {
	let iterator;

	beforeEach(() => {
		iterator = getBaseResourcesRequest();
	});

    it('calls base resources endpoint', () => {
        expect(iterator.next().value).toEqual(call(fetchData, '/v1/baseResources'));
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

describe('watchGetBaseResourcesRequest', () => {
	let iterator = watchGetBaseResourcesRequest();

	it('calls get base resources request saga with latest get base resources request action action', () => {
		expect(iterator.next().value).toEqual(takeEvery('GET_BASE_RESOURCES_REQUEST_ACTION', getBaseResourcesRequest).next().value);
	});
});
