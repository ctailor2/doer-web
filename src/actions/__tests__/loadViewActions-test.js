import {
	loadTodosViewAction,
	loadHistoryViewAction
} from '../loadViewActions';
import {ActionTypes} from '../../constants/actionTypes';

describe('loadTodosViewAction', () => {
	it('creates a load todos view action', () => {
		expect(loadTodosViewAction()).toEqual({
			type: ActionTypes.LOAD_TODOS_VIEW_ACTION
		});
	});
});

describe('loadHistoryViewAction', () => {
	it('creates a load history view action', () => {
		expect(loadHistoryViewAction()).toEqual({
			type: ActionTypes.LOAD_HISTORY_VIEW_ACTION
		});
	});
});
