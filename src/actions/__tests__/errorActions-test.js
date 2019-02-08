import {storeErrorsAction, dismissGlobalAlertAction, clearErrorsAction} from '../errorActions';
import {ActionTypes} from '../../constants/actionTypes';

describe('storeErrorsAction', () => {
	it('creates a store errors action with empty errors by default', () => {
		expect(storeErrorsAction()).toEqual({
			type: ActionTypes.STORE_ERRORS_ACTION,
			errors: {}
		});
	});

	it('creates a store errors action with the supplied errors', () => {
		let errors = {a: 1, b: 2};
		expect(storeErrorsAction(errors)).toEqual({
			type: ActionTypes.STORE_ERRORS_ACTION,
			errors: errors
		});
	});
});

describe('dismissGlobalAlertAction', () => {
	it('creates a dismiss global alert action with null index by default', () => {
		expect(dismissGlobalAlertAction()).toEqual({
			type: ActionTypes.DISMISS_GLOBAL_ALERT_ACTION,
			index: null
		});
	});

	it('creates a dismiss global alert action with the supplied index', () => {
		let index = 123;
		expect(dismissGlobalAlertAction(index)).toEqual({
			type: ActionTypes.DISMISS_GLOBAL_ALERT_ACTION,
			index: index
		});
	});
});

describe('clearErrorsAction', () => {
	it('creates a clear errors action', () => {
		let errors = {a: 1, b: 2};
		expect(clearErrorsAction()).toEqual({
			type: ActionTypes.CLEAR_ERRORS_ACTION
		});
	});
});