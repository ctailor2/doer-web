import * as actionTypes from '../constants/actionTypes';

export function signupRequestAction(data = {}) {
    return {
        type: actionTypes.SIGNUP_REQUEST_ACTION,
        data: data
    }
}

export function loginRequestAction(data = {}) {
    return {
        type: actionTypes.LOGIN_REQUEST_ACTION,
        data: data
    }
}

export function logoutRequestAction() {
    return {
        type: actionTypes.LOGOUT_REQUEST_ACTION
    }
}