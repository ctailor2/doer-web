jest.unmock('../baseResourcesSaga');
jest.unmock('../rootSaga');
jest.unmock('../sessionSaga');
jest.unmock('../todoSaga');

import rootSaga from '../rootSaga';
import {call, fork} from 'redux-saga/effects';
import {getBaseResourcesRequest} from '../baseResourcesSaga';
import {watchSignupRequest, watchLoginRequest, watchLogoutRequest, watchStoreSession} from '../sessionSaga';
import {watchGetTodosRequest, watchCreateTodoRequest} from '../todoSaga';

describe('rootSaga', () => {
    let iterator;

    beforeEach(() => {
        iterator = rootSaga();
    });

    it('gets base resources', () => {
        expect(iterator.next().value).toEqual(call(getBaseResourcesRequest));
    });

    it('forks the watch sagas', () => {
        iterator.next();
        expect(iterator.next().value).toEqual([
            fork(watchSignupRequest),
            fork(watchLoginRequest),
            fork(watchLogoutRequest),
            fork(watchStoreSession),
            fork(watchGetTodosRequest),
            fork(watchCreateTodoRequest)
        ]);
    });
});