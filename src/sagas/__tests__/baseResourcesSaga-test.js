jest.unmock('../sagaHelper');
jest.unmock('../baseResourcesSaga');

import {getBaseResourcesRequest} from '../baseResourcesSaga';
import {fetchData} from '../sagaHelper';
import {call} from 'redux-saga/effects';

describe('getBaseResourcesRequest', () => {
	let iterator = getBaseResourcesRequest();

    it('calls base resources endpoint', () => {
        expect(iterator.next().value).toEqual(call(fetchData, '/v1/baseResources'));
    });
});
