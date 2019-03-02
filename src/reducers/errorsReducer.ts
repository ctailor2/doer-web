import _ from 'lodash';
import { ApplicationAction } from '../actions/actions';
import { Errors } from '../api/errors';
import { ActionTypes } from '../constants/actionTypes';

const defaultState = {
    fieldErrors: [],
    globalErrors: [],
};

export function errors(state: Errors = defaultState, action: ApplicationAction) {
    let newState = _.clone(state);
    switch (action.type) {
        case ActionTypes.STORE_ERRORS_ACTION:
            newState = action.errors;
            break;
        case ActionTypes.DISMISS_GLOBAL_ALERT_ACTION:
            newState.globalErrors = newState.globalErrors.filter((error, index) => {
                return index !== action.index;
            });
            break;
        case ActionTypes.CLEAR_ERRORS_ACTION:
            newState.fieldErrors = [];
            newState.globalErrors = [];
            break;
        default:
            break;
    }
    return newState;
}
