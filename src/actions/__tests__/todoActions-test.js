jest.unmock('../todoActions');

import {getTodosRequestAction} from '../todoActions';

describe('getTodosRequestAction', () => {
	it('create a get todos request action', () => {
		expect(getTodosRequestAction()).toEqual({
			type: 'GET_TODOS_REQUEST_ACTION'
		});
	});
});