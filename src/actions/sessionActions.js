import * as actionTypes from '../constants/actionTypes';

export function signupRequestAction(data = {}) {
    return {
        type: actionTypes.SIGNUP_REQUEST_ACTION,
        data: data
    }
}