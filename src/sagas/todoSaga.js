import * as actionTypes from '../constants/actionTypes';
import {takeEvery} from 'redux-saga';
import {call, put} from 'redux-saga/effects';
import {fetchData, postData, deleteData, putData} from './sagaHelper';
import {storeTodosAction, getTodosRequestAction, storeCompletedTodosAction} from '../actions/todoActions';
import {storeLinksAction} from '../actions/linkActions';
import {getTodoResourcesRequestAction} from '../actions/resourcesActions';

export function* getTodosRequest(action) {
	const {response, error} = yield call(fetchData, action.link.href, {headers: {'Session-Token': localStorage.getItem('sessionToken')}});
	if(response) {
		yield put(storeTodosAction(response.data.todos, action.scheduling));
	} else  if (error) {
	}
}

export function* getCompletedTodosRequest(action) {
	const {response, error} = yield call(fetchData, action.link.href, {headers: {'Session-Token': localStorage.getItem('sessionToken')}});
	if(response) {
		yield put(storeCompletedTodosAction(response.data.todos, action.scheduling));
		yield put(storeLinksAction(response.data._links));
	} else  if (error) {
	}
}

export function* deleteTodoRequest(action) {
	const {response, error} = yield call(deleteData, action.link.href, {headers: {'Session-Token': localStorage.getItem('sessionToken')}});
	if(response) {
        yield put(getTodosRequestAction(response.data._links.nowTodos, 'now'));
        yield put(getTodosRequestAction(response.data._links.laterTodos, 'later'));
        yield put(getTodoResourcesRequestAction(response.data._links.todoResources));
    } else if (error) {
    }
}

export function* postRequestWithTodoData(action) {
	let todo = action.todo;
	const {response, error} = yield call(putData, action.link.href, todo, {headers: {'Session-Token': localStorage.getItem('sessionToken')}});
	if(response) {
		yield put(getTodosRequestAction(response.data._links.nowTodos, 'now'));
		yield put(getTodosRequestAction(response.data._links.laterTodos, 'later'));
		yield put(getTodoResourcesRequestAction(response.data._links.todoResources));
	} else if (error) {
	}
}

export function* postRequestWithNoData(action) {
	const {response, error} = yield call(postData, action.link.href, null, {headers: {'Session-Token': localStorage.getItem('sessionToken')}});
	if(response) {
        yield put(getTodosRequestAction(response.data._links.nowTodos, 'now'));
        yield put(getTodosRequestAction(response.data._links.laterTodos, 'later'));
        yield put(getTodoResourcesRequestAction(response.data._links.todoResources));
    } else if (error) {
    }
}

export function* watchGetTodosRequest() {
	yield* takeEvery(actionTypes.GET_TODOS_REQUEST_ACTION, getTodosRequest);
}

export function* watchGetCompletedTodosRequest() {
	yield* takeEvery(actionTypes.GET_COMPLETED_TODOS_REQUEST_ACTION, getCompletedTodosRequest);
}

export function* watchDeleteTodoRequest() {
	yield* takeEvery(actionTypes.DELETE_TODO_REQUEST_ACTION, deleteTodoRequest);
}

export function* watchCreateTodoRequest() {
	yield* takeEvery(actionTypes.CREATE_TODO_REQUEST_ACTION, postRequestWithTodoData);
}

export function* watchDisplaceTodoRequest() {
	yield* takeEvery(actionTypes.DISPLACE_TODO_REQUEST_ACTION, postRequestWithTodoData);
}

export function* watchUpdateTodoRequest() {
	yield* takeEvery(actionTypes.UPDATE_TODO_REQUEST_ACTION, postRequestWithTodoData);
}

export function* watchCompleteTodoRequest() {
	yield* takeEvery(actionTypes.COMPLETE_TODO_REQUEST_ACTION, postRequestWithNoData);
}

export function* watchMoveTodoRequest() {
	yield* takeEvery(actionTypes.MOVE_TODO_REQUEST_ACTION, postRequestWithNoData);
}

export function* watchPullTodosRequest() {
	yield* takeEvery(actionTypes.PULL_TODOS_REQUEST_ACTION, postRequestWithNoData);
}
