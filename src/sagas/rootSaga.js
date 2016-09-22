import {watchSignupRequest, watchLoginRequest, watchLogoutRequest} from './sessionSaga';
import {fork} from 'redux-saga/effects';

export default function* rootSaga() {
    yield [
        fork(watchSignupRequest),
        fork(watchLoginRequest),
        fork(watchLogoutRequest)
    ];
}