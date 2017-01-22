import * as actionTypes from '../constants/actionTypes';
import {takeEvery} from 'redux-saga';
import {call, put} from 'redux-saga/effects';
import {fetchData, postData} from './sagaHelper';
import {storeTodosAction, getTodosRequestAction} from '../actions/todoActions';
import {storeLinksAction} from '../actions/linkActions';

export function* getTodosRequest(action) {
	const {response, error} = yield call(fetchData, action.link.href, {headers: {'Session-Token': localStorage.getItem('sessionToken')}});
	if(response) {
		yield put(storeTodosAction(response.data.todos, action.scheduling));
		yield put(storeLinksAction(response.data._links));
	} else  if (error) {
	}
}

export function* createTodoRequest(action) {
	let todo = action.todo;
	const {response, error} = yield call(postData, action.link.href, todo, {headers: {'Session-Token': localStorage.getItem('sessionToken')}});
	if(response) {
		yield put(getTodosRequestAction(response.data._links.todos));
	} else if (error) {
	}
}

export function* watchGetTodosRequest() {
	yield* takeEvery(actionTypes.GET_TODOS_REQUEST_ACTION, getTodosRequest);
}

export function* watchCreateTodoRequest() {
	yield* takeEvery(actionTypes.CREATE_TODO_REQUEST_ACTION, createTodoRequest);
}
