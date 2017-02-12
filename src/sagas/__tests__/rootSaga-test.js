jest.unmock('../rootSaga');
jest.unmock('../sessionSaga');
jest.unmock('../todoSaga');
jest.unmock('../baseResourcesSaga');
jest.unmock('../homeResourcesSaga');
jest.unmock('../linksSaga');


import rootSaga from '../rootSaga';
import {call, fork} from 'redux-saga/effects';
import {watchSignupRequest, watchLoginRequest, watchLogoutRequest, watchStoreSession} from '../sessionSaga';
import {watchGetTodosRequest, watchCreateTodoRequest, watchDeleteTodoRequest, watchDisplaceTodoRequest} from '../todoSaga';
import {watchGetBaseResourcesRequest} from '../baseResourcesSaga';
import {watchGetHomeResourcesRequest} from '../homeResourcesSaga';
import {watchPersistLink} from '../linksSaga';

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
            fork(watchDeleteTodoRequest),
            fork(watchGetBaseResourcesRequest),
            fork(watchGetHomeResourcesRequest),
            fork(watchDisplaceTodoRequest),
            fork(watchPersistLink)
        ]);
    });
});