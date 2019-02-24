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
    watchGetListRequest,
    watchGetCompletedListRequest,
    watchUnlockListRequest
} from './listSaga';
import {fork} from 'redux-saga/effects';

export default function* rootSaga() {
    yield [
        fork(watchCreateTodoRequest),
        fork(watchDeleteTodoRequest),
        fork(watchDisplaceTodoRequest),
        fork(watchUpdateTodoRequest),
        fork(watchCompleteTodoRequest),
        fork(watchMoveTodoRequest),
        fork(watchPullTodosRequest),
        fork(watchEscalateTodosRequest),
        fork(watchGetListRequest),
        fork(watchGetCompletedListRequest),
        fork(watchUnlockListRequest)
    ];
}