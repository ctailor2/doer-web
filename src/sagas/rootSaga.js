import {watchSignupRequest, watchLoginRequest, watchLogoutRequest, watchStoreSession} from './sessionSaga';
import {watchGetTodosRequest, watchCreateTodoRequest} from './todoSaga';
import {getBaseResourcesRequest} from './baseResourcesSaga';
import {call, fork} from 'redux-saga/effects';

export default function* rootSaga() {
	yield call(getBaseResourcesRequest);
    yield [
        fork(watchSignupRequest),
        fork(watchLoginRequest),
        fork(watchLogoutRequest),
        fork(watchStoreSession),
        fork(watchGetTodosRequest),
        fork(watchCreateTodoRequest)
    ];
}