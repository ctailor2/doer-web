import {takeLatest, takeEvery} from 'redux-saga';
import {call, put} from 'redux-saga/effects';
import {postData} from './sagaHelper';
import * as actionTypes from '../constants/actionTypes';
import {browserHistory} from 'react-router';
import {storeSessionAction} from '../actions/sessionActions';
import {persistLinkAction} from '../actions/linkActions';

export function* signupRequest(action) {
    const {response, error} = yield call(postData, action.link.href, action.data);
    if(response) {
        yield put(storeSessionAction(response.data.session.token));
        yield put(persistLinkAction(response.data._links.home));
        yield browserHistory.push('/');
    } else if (error) {
        // TODO: handle error
    }
}

export function* watchSignupRequest() {
    yield* takeLatest(actionTypes.SIGNUP_REQUEST_ACTION, signupRequest);
}

export function* loginRequest(action) {
    const {response, error} = yield call(postData, action.link.href, action.data);
    if(response) {
        yield put(storeSessionAction(response.data.session.token));
        yield put(persistLinkAction(response.data._links.home));
        yield browserHistory.push('/');
    } else if (error) {
        // TODO: handle error
    }
}

export function* watchLoginRequest() {
    yield* takeLatest(actionTypes.LOGIN_REQUEST_ACTION, loginRequest);
}

export function* logoutRequest() {
    yield localStorage.removeItem('sessionToken');
    yield localStorage.removeItem('link');
    yield browserHistory.push('/login');
}

export function* watchLogoutRequest() {
    yield* takeLatest(actionTypes.LOGOUT_REQUEST_ACTION, logoutRequest);
}

export function* storeSession(action) {
    yield localStorage.setItem('sessionToken', action.token);
}

export function* watchStoreSession() {
    yield* takeEvery(actionTypes.STORE_SESSION_ACTION, storeSession);
}