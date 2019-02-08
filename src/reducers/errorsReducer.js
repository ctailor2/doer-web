import {ActionTypes} from '../constants/actionTypes';
import _ from 'lodash';

export function errors(state = {fieldErrors: [], globalErrors: []}, action = {}) {
	let newState = _.clone(state);
	switch(action.type) {
		case ActionTypes.STORE_ERRORS_ACTION:
			newState = action.errors;
			break;
		case ActionTypes.DISMISS_GLOBAL_ALERT_ACTION:
		    newState.globalErrors = newState.globalErrors.filter((error, index) => {
                return index !== action.index
            });
			break;
	    case ActionTypes.CLEAR_ERRORS_ACTION:
	        newState.fieldErrors = [];
	        newState.globalErrors = [];
	        break;
		default:
			break;
	}
	return newState
}