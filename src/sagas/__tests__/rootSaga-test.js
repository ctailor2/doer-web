import rootSaga from '../rootSaga';
import {fork} from 'redux-saga/effects';
import {
	watchCreateTodoRequest,
	watchDeleteTodoRequest,
	watchDisplaceTodoRequest,
	watchUpdateTodoRequest,
	watchCompleteTodoRequest,
	watchMoveTodoRequest,
	watchPullTodosRequest,
	watchEscalateTodosRequest,
} from '../todoSaga';
import {
    watchGetListRequest,
    watchGetCompletedListRequest,
    watchUnlockListRequest
} from '../listSaga';

describe('rootSaga', () => {
    let iterator = rootSaga();

    it('forks the watch sagas', () => {
        expect(iterator.next().value).toEqual([
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
        ]);
    });
});