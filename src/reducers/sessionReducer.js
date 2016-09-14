import * as actionTypes from '../constants/actionTypes';
import _ from 'lodash';

let initialState = {};

export function session(state = initialState, action) {
    let newState = _.clone(initialState);
    switch(action.type) {
        case actionTypes.SIGNUP_RESPONSE_ACTION:
            return Object.assign({}, newState, action.data);
        default:
            return initialState;
    }
}