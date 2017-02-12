import {watchSignupRequest, watchLoginRequest, watchLogoutRequest, watchStoreSession} from './sessionSaga';
import {watchGetTodosRequest, watchCreateTodoRequest, watchDeleteTodoRequest, watchDisplaceTodoRequest} from './todoSaga';
import {watchGetBaseResourcesRequest} from './baseResourcesSaga';
import {watchGetHomeResourcesRequest} from './homeResourcesSaga';
import {watchPersistLink} from './linksSaga';
import {call, fork} from 'redux-saga/effects';

export default function* rootSaga() {
    yield [
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
    ];
}