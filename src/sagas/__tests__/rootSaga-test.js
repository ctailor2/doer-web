jest.unmock('../rootSaga');
jest.unmock('../sessionSaga');
jest.unmock('../todoSaga');
jest.unmock('../resourcesSaga');
jest.unmock('../linksSaga');
jest.unmock('../loadViewSaga');
jest.unmock('../listSaga');

import rootSaga from '../rootSaga';
import {call, fork} from 'redux-saga/effects';
import {watchSignupRequest, watchLoginRequest, watchLogoutRequest, watchStoreSession} from '../sessionSaga';
import {
	watchGetTodosRequest,
	watchGetCompletedTodosRequest,
	watchCreateTodoRequest,
	watchDeleteTodoRequest,
	watchDisplaceTodoRequest,
	watchUpdateTodoRequest,
	watchCompleteTodoRequest,
	watchMoveTodoRequest,
	watchPullTodosRequest,
	watchGetDeferredTodosRequest,
} from '../todoSaga';
import {
    watchGetBaseResourcesRequest,
    watchGetRootResourcesRequest,
    watchGetTodoResourcesRequest,
    watchGetHistoryResourcesRequest
} from '../resourcesSaga';
import {
    watchGetListRequest,
    watchUnlockListRequest
} from '../listSaga';
import {watchPersistLink} from '../linksSaga';
import {watchLoadTodosView, watchLoadHistoryView} from '../loadViewSaga';

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
            fork(watchGetRootResourcesRequest),
            fork(watchGetTodoResourcesRequest),
            fork(watchGetHistoryResourcesRequest),
            fork(watchDisplaceTodoRequest),
            fork(watchPersistLink),
            fork(watchUpdateTodoRequest),
            fork(watchCompleteTodoRequest),
            fork(watchMoveTodoRequest),
            fork(watchLoadTodosView),
            fork(watchLoadHistoryView),
            fork(watchGetCompletedTodosRequest),
            fork(watchPullTodosRequest),
            fork(watchGetDeferredTodosRequest),
            fork(watchGetListRequest),
            fork(watchUnlockListRequest)
        ]);
    });
});