import { ApplicationAction } from '../../actions/actions';
import { ActionTypes } from '../../constants/actionTypes';
import { errors } from '../errorsReducer';

describe('errors', () => {
    it('has initial state', () => {
        expect(errors(undefined, {
            type: ActionTypes.GET_BASE_RESOURCES_REQUEST_ACTION,
        })).toEqual({ fieldErrors: [], globalErrors: [] });
    });

    it('stores the errors from a STORE_ERRORS_ACTION when received', () => {
        const newErrors = {
            fieldErrors: [{
                field: 'newSomeField',
                message: 'newSomeMessage',
            }],
            globalErrors: [{ message: 'newSomeGlobalMessage' }],
        };
        const action = {
            type: ActionTypes.STORE_ERRORS_ACTION,
            errors: newErrors,
        } as ApplicationAction;
        const errorsState = errors({
            fieldErrors: [{
                field: 'oldSomeField',
                message: 'oldSomeMessage',
            }],
            globalErrors: [{ message: 'oldSomeGlobalMessage' }],
        }, action);
        expect(errorsState).toEqual(newErrors);
    });

    it('removes the referenced global error from a DISMISS_GLOBAL_ALERT_ACTION when received', () => {
        const index = 1;
        const action = {
            type: ActionTypes.DISMISS_GLOBAL_ALERT_ACTION,
            index,
        } as ApplicationAction;
        const currentState = {
            globalErrors: [
                { message: 'firstMessage' },
                { message: 'secondMessage' },
                { message: 'thirdMessage' }],
            fieldErrors: [],
        };
        const errorsState = errors(currentState, action);
        const expectedState = {
            globalErrors: [
                { message: 'firstMessage' },
                { message: 'thirdMessage' }],
            fieldErrors: [],
        };
        expect(errorsState).toEqual(expectedState);
    });

    it('clears errors when a CLEAR_ERRORS_ACTION is received', () => {
        const action = {
            type: ActionTypes.CLEAR_ERRORS_ACTION,
        } as ApplicationAction;
        const errorsState = errors({
            globalErrors: [
                { message: 'someGlobalMessage' }],
            fieldErrors: [{
                field: 'someField',
                message: 'someMessage',
            }],
        }, action);
        const expectedState = { globalErrors: [], fieldErrors: [] };
        expect(errorsState).toEqual(expectedState);
    });
});
