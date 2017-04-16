import {takeLatest} from 'redux-saga';
import * as actionTypes from '../constants/actionTypes';
import {fetchData} from './sagaHelper';
import {call, put} from 'redux-saga/effects';
import {loadTodosViewCompleteAction, loadHistoryViewCompleteAction} from '../actions/loadViewActions';
import {storeLinksAction} from '../actions/linkActions';
import {getTodosRequestAction, getCompletedTodosRequestAction} from '../actions/todoActions';

export function* loadTodosView() {
	let url = localStorage.getItem('link');
	let sessionToken = localStorage.getItem('sessionToken');
	let {response: rootResourcesResponse, error: rootResourcesError} = yield call(fetchData, url, {headers: {'Session-Token': sessionToken}});
	if(rootResourcesResponse) {
    	let {response: todoResourcesResponse, error: todoResourcesError} = yield call(fetchData, rootResourcesResponse.data._links.todoResources.href, {headers: {'Session-Token': sessionToken}});
    	if(todoResourcesResponse) {
    	    yield put(storeLinksAction(todoResourcesResponse.data._links));
            yield put(getTodosRequestAction(todoResourcesResponse.data._links.nowTodos, 'now'));
            yield put(loadTodosViewCompleteAction());
    	} else if (todoResourcesError) {
            // TODO: handle error
    	}
	} else if (rootResourcesError) {
		// TODO: handle error
	}
}

export function* watchLoadTodosView() {
    yield* takeLatest(actionTypes.LOAD_TODOS_VIEW_ACTION, loadTodosView);
}

export function* loadHistoryView() {
	let url = localStorage.getItem('link');
	let sessionToken = localStorage.getItem('sessionToken');
	const {response: rootResourcesResponse, error: rootResourcesError} = yield call(fetchData, url, {headers: {'Session-Token': sessionToken}});
	if(rootResourcesResponse) {
    	let {response: historyResourcesResponse, error: historyResourcesError} = yield call(fetchData, rootResourcesResponse.data._links.historyResources.href, {headers: {'Session-Token': sessionToken}});
        if (historyResourcesResponse) {
            yield put(storeLinksAction(historyResourcesResponse.data._links));
            yield put(getCompletedTodosRequestAction(historyResourcesResponse.data._links.completedTodos));
            yield put(loadHistoryViewCompleteAction());
        } else if (historyResourcesError) {
            // TODO: handle error
        }
	} else if (rootResourcesError) {
		// TODO: handle error
	}
}

export function* watchLoadHistoryView() {
    yield* takeLatest(actionTypes.LOAD_HISTORY_VIEW_ACTION, loadHistoryView);
}