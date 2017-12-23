import {errors} from '../errorsReducer';

describe('errors', () => {
	it('has initial state', () => {
		expect(errors()).toEqual({fieldErrors: [], globalErrors: []});
	});

	it('stores the errors from a STORE_ERRORS_ACTION when received', () => {
		let newErrors = {a: 1, b: 2};
		let action = {
			type: 'STORE_ERRORS_ACTION',
			errors: newErrors
		};
		let errorsState = errors({c: 3, d: 2}, action);
		expect(errorsState).toEqual(newErrors);
	});

	it('removes the referenced global error from a DISMISS_GLOBAL_ALERT_ACTION when received', () => {
		let index = 1;
		let action = {
			type: 'DISMISS_GLOBAL_ALERT_ACTION',
			index: index
		};
		let currentState = {globalErrors: [3, 5, 7], fieldErrors: [2, 4, 6]};
		let errorsState = errors(currentState, action);
		let expectedState = {globalErrors: [3, 7], fieldErrors: [2, 4, 6]}
		expect(errorsState).toEqual(expectedState);
	});

	it('clears errors when a CLEAR_ERRORS_ACTION is received', () => {
        let action = {
            type: 'CLEAR_ERRORS_ACTION'
        };
        let errorsState = errors({globalErrors: [{a: 1}], fieldErrors: [{b: 2}]}, action);
		let expectedState = {globalErrors: [], fieldErrors: []}
        expect(errorsState).toEqual(expectedState);
	});
});