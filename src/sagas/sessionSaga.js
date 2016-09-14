import {takeLatest} from 'redux-saga';
import {call, put} from 'redux-saga/effects';
import {postData} from './sagaHelper';
import * as actionTypes from '../constants/actionTypes';
import {browserHistory} from 'react-router';

export function* signupRequest(action) {
    const {response, error} = yield call(postData, '/v1/signup', action.data);
    if(response) {
        yield put({type: actionTypes.SIGNUP_RESPONSE_ACTION, data: response.data});
        browserHistory.push('/');
    } else if (error) {
        // TODO: handle error
    }
}

export function* watchSignupRequest() {
    yield* takeLatest(actionTypes.SIGNUP_REQUEST_ACTION, signupRequest);
}