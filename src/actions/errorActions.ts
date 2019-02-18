import {ActionTypes} from '../constants/actionTypes';

export interface StoreErrorsAction {
	type: ActionTypes.STORE_ERRORS_ACTION;
	errors: {
		fieldErrors: {
			field: string;
			message: string;
		}[],
		globalErrors: {
			message: string;
		}[]
	}
}

export function storeErrorsAction(errors = {}) {
	return {
		type: ActionTypes.STORE_ERRORS_ACTION,
		errors: errors
	}
}

export function dismissGlobalAlertAction(index = null) {
	return {
		type: ActionTypes.DISMISS_GLOBAL_ALERT_ACTION,
		index: index
	}
}

export interface ClearErrorsAction {
	type: ActionTypes.CLEAR_ERRORS_ACTION
}

export function clearErrorsAction() {
    return {
        type: ActionTypes.CLEAR_ERRORS_ACTION
    }
}