import {takeLatest} from 'redux-saga';
import * as actionTypes from '../constants/actionTypes';
import {fetchData} from './sagaHelper';
import {call, put} from 'redux-saga/effects';
import {loadTodosViewCompleteAction, loadHistoryViewCompleteAction} from '../actions/loadViewActions';
import {getTodosRequestAction, getCompletedTodosRequestAction} from '../actions/todoActions';
import {storeLinksAction} from '../actions/linkActions';

export function* loadTodosView(action) {
	let url = localStorage.getItem('link');
	let sessionToken = localStorage.getItem('sessionToken');
	const {response, error} = yield call(fetchData, url, {headers: {'Session-Token': sessionToken}});
	if(response) {
        yield put(storeLinksAction(response.data._links));
		yield put(getTodosRequestAction(response.data._links.todos));
	    yield put(loadTodosViewCompleteAction());
	} else if (error) {
		// TODO: handle error
	}
}

export function* watchLoadTodosView() {
    yield* takeLatest(actionTypes.LOAD_TODOS_VIEW_ACTION, loadTodosView);
}

export function* loadHistoryView(action) {
	let url = localStorage.getItem('link');
	let sessionToken = localStorage.getItem('sessionToken');
	const {response, error} = yield call(fetchData, url, {headers: {'Session-Token': sessionToken}});
	if(response) {
		yield put(getCompletedTodosRequestAction(response.data._links.completedTodos));
	    yield put(loadHistoryViewCompleteAction());
	} else if (error) {
		// TODO: handle error
	}
}

export function* watchLoadHistoryView() {
    yield* takeLatest(actionTypes.LOAD_HISTORY_VIEW_ACTION, loadHistoryView);
}