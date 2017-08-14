jest.unmock('../loadViewActions');

import {
	loadTodosViewAction,
	loadHistoryViewAction
} from '../loadViewActions';

describe('loadTodosViewAction', () => {
	it('creates a load todos view action', () => {
		expect(loadTodosViewAction()).toEqual({
			type: 'LOAD_TODOS_VIEW_ACTION'
		});
	});
});

describe('loadHistoryViewAction', () => {
	it('creates a load history view action', () => {
		expect(loadHistoryViewAction()).toEqual({
			type: 'LOAD_HISTORY_VIEW_ACTION'
		});
	});
});
