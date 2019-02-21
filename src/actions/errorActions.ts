import { Errors } from '../api/errors';
import { ActionTypes } from '../constants/actionTypes';

export interface StoreErrorsAction {
    type: ActionTypes.STORE_ERRORS_ACTION;
    errors: Errors;
}

export const storeErrorsAction = (errors: Errors): StoreErrorsAction => ({
    type: ActionTypes.STORE_ERRORS_ACTION,
    errors,
});

export interface DismissGlobalAlertAction {
    type: ActionTypes.DISMISS_GLOBAL_ALERT_ACTION;
    index: number;
}

export const dismissGlobalAlertAction = (index: number): DismissGlobalAlertAction => ({
    type: ActionTypes.DISMISS_GLOBAL_ALERT_ACTION,
    index,
});

export interface ClearErrorsAction {
    type: ActionTypes.CLEAR_ERRORS_ACTION;
}

export const clearErrorsAction = (): ClearErrorsAction => ({
    type: ActionTypes.CLEAR_ERRORS_ACTION,
});
