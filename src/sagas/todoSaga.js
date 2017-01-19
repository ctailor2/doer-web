import * as actionTypes from '../constants/actionTypes';
import {takeEvery} from 'redux-saga';
import {call, put} from 'redux-saga/effects';
import {fetchData, postData} from './sagaHelper';
import {storeTodosAction, getTodosRequestAction} from '../actions/todoActions';

export function* getTodosRequest(action) {
	let url = '/v1/todos?scheduling=' + action.scheduling;
	const {response, error} = yield call(fetchData, url, {headers: {'Session-Token': localStorage.getItem('sessionToken')}});
	if(response) {
		yield put(storeTodosAction(response.data, action.scheduling));
	} else  if (error) {
	}
}

export function* createTodoRequest(action) {
	let url = '/v1/todos';
	let todo = action.todo;
	const {response, error} = yield call(postData, url, todo, {headers: {'Session-Token': localStorage.getItem('sessionToken')}});
	if(response) {
		yield put(getTodosRequestAction(todo.scheduling));
	} else if (error) {
	}
}

export function* watchGetTodosRequest() {
	yield* takeEvery(actionTypes.GET_TODOS_REQUEST_ACTION, getTodosRequest);
}

export function* watchCreateTodoRequest() {
	yield* takeEvery(actionTypes.CREATE_TODO_REQUEST_ACTION, createTodoRequest);
}
