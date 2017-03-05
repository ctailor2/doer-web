jest.unmock('../loadViewActions');

import {
	loadTodosViewAction,
	loadTodosViewCompleteAction,
	loadHistoryViewAction,
	loadHistoryViewCompleteAction
} from '../loadViewActions';

describe('loadTodosViewAction', () => {
	it('creates a load todos view action', () => {
		expect(loadTodosViewAction()).toEqual({
			type: 'LOAD_TODOS_VIEW_ACTION'
		});
	});
});

describe('loadTodosViewCompleteAction', () => {
	it('creates a load todos view complete action', () => {
		expect(loadTodosViewCompleteAction()).toEqual({
			type: 'LOAD_TODOS_VIEW_COMPLETE_ACTION'
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

describe('loadHistoryViewCompleteAction', () => {
	it('creates a load history view complete action', () => {
		expect(loadHistoryViewCompleteAction()).toEqual({
			type: 'LOAD_HISTORY_VIEW_COMPLETE_ACTION'
		});
	});
});
