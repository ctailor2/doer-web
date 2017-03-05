import {watchSignupRequest, watchLoginRequest, watchLogoutRequest, watchStoreSession} from './sessionSaga';
import {
	watchGetTodosRequest,
	watchGetCompletedTodosRequest,
	watchCreateTodoRequest,
	watchDeleteTodoRequest,
	watchDisplaceTodoRequest,
	watchUpdateTodoRequest,
	watchCompleteTodoRequest
} from './todoSaga';
import {watchGetBaseResourcesRequest} from './baseResourcesSaga';
import {watchGetHomeResourcesRequest} from './homeResourcesSaga';
import {watchPersistLink} from './linksSaga';
import {watchLoadTodosView, watchLoadHistoryView} from './loadViewSaga';
import {fork} from 'redux-saga/effects';

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
        fork(watchPersistLink),
        fork(watchUpdateTodoRequest),
        fork(watchCompleteTodoRequest),
        fork(watchLoadTodosView),
        fork(watchLoadHistoryView),
        fork(watchGetCompletedTodosRequest)
    ];
}