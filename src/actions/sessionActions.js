import {ActionTypes} from '../constants/actionTypes'

export function signupRequestAction(link = {}, data = {}) {
    return {
        type: ActionTypes.SIGNUP_REQUEST_ACTION,
        link: link,
        data: data
    }
}

export function loginRequestAction(link = {}, data = {}) {
    return {
        type: ActionTypes.LOGIN_REQUEST_ACTION,
        link: link,
        data: data
    }
}

export function logoutRequestAction() {
    return {
        type: ActionTypes.LOGOUT_REQUEST_ACTION
    }
}

export function storeSessionAction(token = '') {
	return {
		type: ActionTypes.STORE_SESSION_ACTION,
		token: token
	}
}