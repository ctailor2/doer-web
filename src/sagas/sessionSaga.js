import {takeLatest} from 'redux-saga';
import {call, put} from 'redux-saga/effects';
import {postData} from './sagaHelper';
import * as actionTypes from '../constants/actionTypes';
import {browserHistory} from 'react-router';

export function* signupRequest(action) {
    const {response, error} = yield call(postData, '/v1/signup', action.data);
    if(response) {
        localStorage.setItem('sessionToken', response.data.sessionToken.token);
        // TODO: fire action to get todos
        browserHistory.push('/');
    } else if (error) {
        // TODO: handle error
    }
}

export function* watchSignupRequest() {
    yield* takeLatest(actionTypes.SIGNUP_REQUEST_ACTION, signupRequest);
}

export function* loginRequest(action) {
    const {response, error} = yield call(postData, '/v1/login', action.data);
    if(response) {
        localStorage.setItem('sessionToken', response.data.sessionToken.token);
        // TODO: fire action to get todos
        browserHistory.push('/');
    } else if (error) {
        // TODO: handle error
    }
}

export function* watchLoginRequest() {
    yield* takeLatest(actionTypes.LOGIN_REQUEST_ACTION, loginRequest);
}

export function* logoutRequest() {
    const {response, error} = yield call(postData, '/v1/logout', {}, {headers: {'Session-Token': localStorage.getItem('sessionToken')}});
    if(response) {
        // TODO: fire action to get todos
        browserHistory.push('/login');
    } else if (error) {
        // TODO: handle error
    }
}

export function* watchLogoutRequest() {
    yield* takeLatest(actionTypes.LOGOUT_REQUEST_ACTION, logoutRequest);
}