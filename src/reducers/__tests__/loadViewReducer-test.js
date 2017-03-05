jest.unmock('../loadViewReducer');

import {loadView} from '../loadViewReducer';

describe('loadView', () => {
	it('has initial state', () => {
		expect(loadView()).toEqual({todosViewLoaded: false, historyViewLoaded: false});
	});

	it('it toggles the todosViewLoaded state to true when a LOAD_TODOS_VIEW_COMPLETE_ACTION is received', () => {
		let action = {type: 'LOAD_TODOS_VIEW_COMPLETE_ACTION'};
		expect(loadView({todosViewLoaded: false}, action)).toEqual({todosViewLoaded: true});
	});

	it('it toggles the historyViewLoaded state to true when a LOAD_HISTORY_VIEW_COMPLETE_ACTION is received', () => {
		let action = {type: 'LOAD_HISTORY_VIEW_COMPLETE_ACTION'};
		expect(loadView({historyViewLoaded: false}, action)).toEqual({historyViewLoaded: true});
	});
});