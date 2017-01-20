import * as actionTypes from '../constants/actionTypes';

export function signupRequestAction(link = {}, data = {}) {
    return {
        type: actionTypes.SIGNUP_REQUEST_ACTION,
        link: link,
        data: data
    }
}

export function loginRequestAction(link = {}, data = {}) {
    return {
        type: actionTypes.LOGIN_REQUEST_ACTION,
        link: link,
        data: data
    }
}

export function logoutRequestAction() {
    return {
        type: actionTypes.LOGOUT_REQUEST_ACTION
    }
}

export function storeSessionAction(token = '') {
	return {
		type: actionTypes.STORE_SESSION_ACTION,
		token: token
	}
}