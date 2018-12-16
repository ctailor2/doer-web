import {watchSignupRequest, watchLoginRequest, watchLogoutRequest, watchStoreSession} from './sessionSaga';
import {
	watchCreateTodoRequest,
	watchDeleteTodoRequest,
	watchDisplaceTodoRequest,
	watchUpdateTodoRequest,
	watchCompleteTodoRequest,
	watchMoveTodoRequest,
	watchPullTodosRequest,
	watchEscalateTodosRequest
} from './todoSaga';
import {
    watchGetBaseResourcesRequest,
    watchGetRootResourcesRequest,
    watchGetTodoResourcesRequest,
    watchGetHistoryResourcesRequest
} from './resourcesSaga';
import {
    watchGetListRequest,
    watchGetCompletedListRequest,
    watchUnlockListRequest
} from './listSaga';
import {watchPersistLink} from './linksSaga';
import {watchLoadTodosView, watchLoadHistoryView} from './loadViewSaga';
import {fork} from 'redux-saga/effects';

export default function* rootSaga() {
    yield [
        fork(watchSignupRequest),
        fork(watchLoginRequest),
        fork(watchLogoutRequest),
        fork(watchStoreSession),
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
        fork(watchPullTodosRequest),
        fork(watchEscalateTodosRequest),
        fork(watchGetListRequest),
        fork(watchGetCompletedListRequest),
        fork(watchUnlockListRequest)
    ];
}