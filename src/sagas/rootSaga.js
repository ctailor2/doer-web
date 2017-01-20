import {watchSignupRequest, watchLoginRequest, watchLogoutRequest, watchStoreSession} from './sessionSaga';
import {watchGetTodosRequest, watchCreateTodoRequest} from './todoSaga';
import {watchGetBaseResourcesRequest} from './baseResourcesSaga';
import {watchGetHomeResourcesRequest} from './homeResourcesSaga';
import {call, fork} from 'redux-saga/effects';

export default function* rootSaga() {
    yield [
        fork(watchSignupRequest),
        fork(watchLoginRequest),
        fork(watchLogoutRequest),
        fork(watchStoreSession),
        fork(watchGetTodosRequest),
        fork(watchCreateTodoRequest),
        fork(watchGetBaseResourcesRequest),
        fork(watchGetHomeResourcesRequest)
    ];
}