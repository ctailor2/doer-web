import * as actionTypes from '../constants/actionTypes';

export function storeErrorsAction(errors = {}) {
	return {
		type: actionTypes.STORE_ERRORS_ACTION,
		errors: errors
	}
}

export function dismissGlobalAlertAction(index = null) {
	return {
		type: actionTypes.DISMISS_GLOBAL_ALERT_ACTION,
		index: index
	}
}