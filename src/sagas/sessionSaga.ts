import { takeLatest, takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { postData } from './sagaHelper';
import { browserHistory } from 'react-router';
import { storeSessionAction, SignupRequestAction, LoginRequestAction, StoreSessionAction as StoreSessionAction, SignupInfo, LoginInfo, Link } from '../actions/sessionActions';
import { persistLinkAction } from '../actions/linkActions';
import { storeErrorsAction, clearErrorsAction } from '../actions/errorActions';
import { ActionTypes } from '../constants/actionTypes'

export function* loginRequest(action: LoginRequestAction) {
    yield put(clearErrorsAction());
    const { response, error } = yield call(postData, action.link.href, action.loginInfo);
    if (response) {
        yield put(storeSessionAction(response.data.session.token));
        yield put(persistLinkAction(response.data._links.root));
        yield browserHistory.push('/');
    } else if (error) {
        yield put(storeErrorsAction(error.response.data));
    }
}

export function* watchLoginRequest() {
    yield* takeLatest(ActionTypes.LOGIN_REQUEST_ACTION, loginRequest);
}

export function* logoutRequest() {
    yield localStorage.removeItem('sessionToken');
    yield localStorage.removeItem('link');
    yield browserHistory.push('/login');
}

export function* watchLogoutRequest() {
    yield* takeLatest(ActionTypes.LOGOUT_REQUEST_ACTION, logoutRequest);
}

export function* storeSession(action: StoreSessionAction) {
    yield localStorage.setItem('sessionToken', action.token);
}

export function* watchStoreSession() {
    yield* takeEvery(ActionTypes.STORE_SESSION_ACTION, storeSession);
}