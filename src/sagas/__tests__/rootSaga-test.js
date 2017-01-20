jest.unmock('../baseResourcesSaga');
jest.unmock('../rootSaga');
jest.unmock('../sessionSaga');
jest.unmock('../todoSaga');

import rootSaga from '../rootSaga';
import {call, fork} from 'redux-saga/effects';
import {watchSignupRequest, watchLoginRequest, watchLogoutRequest, watchStoreSession} from '../sessionSaga';
import {watchGetTodosRequest, watchCreateTodoRequest} from '../todoSaga';
import {watchGetBaseResourcesRequest} from '../baseResourcesSaga';

describe('rootSaga', () => {
    let iterator = rootSaga();

    it('forks the watch sagas', () => {
        expect(iterator.next().value).toEqual([
            fork(watchSignupRequest),
            fork(watchLoginRequest),
            fork(watchLogoutRequest),
            fork(watchStoreSession),
            fork(watchGetTodosRequest),
            fork(watchCreateTodoRequest),
            fork(watchGetBaseResourcesRequest)
        ]);
    });
});