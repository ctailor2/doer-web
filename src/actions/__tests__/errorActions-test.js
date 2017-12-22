import {storeErrorsAction, dismissGlobalAlertAction} from '../errorActions';

describe('storeErrorsAction', () => {
	it('creates a store errors action with empty errors by default', () => {
		expect(storeErrorsAction()).toEqual({
			type: 'STORE_ERRORS_ACTION',
			errors: {}
		});
	});

	it('creates a store errors action with the supplied errors', () => {
		let errors = {a: 1, b: 2};
		expect(storeErrorsAction(errors)).toEqual({
			type: 'STORE_ERRORS_ACTION',
			errors: errors
		});
	});
});

describe('dismissGlobalAlertAction', () => {
	it('creates a dismiss global alert action with null index by default', () => {
		expect(dismissGlobalAlertAction()).toEqual({
			type: 'DISMISS_GLOBAL_ALERT_ACTION',
			index: null
		});
	});

	it('creates a dismiss global alert action with the supplied index', () => {
		let index = 123;
		expect(dismissGlobalAlertAction(index)).toEqual({
			type: 'DISMISS_GLOBAL_ALERT_ACTION',
			index: index
		});
	});
});