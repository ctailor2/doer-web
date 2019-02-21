import { ActionTypes } from '../constants/actionTypes';

export interface LoadTodosViewAction {
    type: ActionTypes.LOAD_TODOS_VIEW_ACTION;
}

export const loadTodosViewAction = (): LoadTodosViewAction => ({
    type: ActionTypes.LOAD_TODOS_VIEW_ACTION,
});

export interface LoadHistoryViewAction {
    type: ActionTypes.LOAD_HISTORY_VIEW_ACTION;
}

export const loadHistoryViewAction = (): LoadHistoryViewAction => ({
    type: ActionTypes.LOAD_HISTORY_VIEW_ACTION,
});
