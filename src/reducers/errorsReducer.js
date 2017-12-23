import * as actionTypes from '../constants/actionTypes';
import _ from 'lodash';

export function errors(state = {fieldErrors: [], globalErrors: []}, action = {}) {
	let newState = _.clone(state);
	switch(action.type) {
		case actionTypes.STORE_ERRORS_ACTION:
			newState = action.errors;
			break;
		case actionTypes.DISMISS_GLOBAL_ALERT_ACTION:
		    newState.globalErrors = newState.globalErrors.filter((error, index) => {
                return index !== action.index
            });
			break;
	    case actionTypes.CLEAR_ERRORS_ACTION:
	        newState.fieldErrors = [];
	        newState.globalErrors = [];
	        break;
		default:
			break;
	}
	return newState
}