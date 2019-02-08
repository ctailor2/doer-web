import {ActionTypes} from '../constants/actionTypes';
import {takeEvery} from 'redux-saga';
import {call, put} from 'redux-saga/effects';
import {postData, deleteData, putData} from './sagaHelper';
import {getListRequestAction} from '../actions/listActions';
import {storeErrorsAction, clearErrorsAction} from '../actions/errorActions';

export function* deleteTodoRequest(action) {
	const {response, error} = yield call(deleteData, action.link.href, {headers: {'Session-Token': localStorage.getItem('sessionToken')}});
	if(response) {
        yield put(getListRequestAction(response.data._links.list));
    } else if (error) {
    }
}

export function* postRequestWithTodoData(action) {
	let todo = action.todo;
    yield put(clearErrorsAction());
	const {response, error} = yield call(postData, action.link.href, todo, {headers: {'Session-Token': localStorage.getItem('sessionToken')}});
	if(response) {
        yield put(getListRequestAction(response.data._links.list));
	} else if (error) {
        yield put(storeErrorsAction(error.response.data));
	}
}

export function* putRequestWithTodoData(action) {
	let todo = action.todo;
    yield put(clearErrorsAction());
	const {response, error} = yield call(putData, action.link.href, todo, {headers: {'Session-Token': localStorage.getItem('sessionToken')}});
	if(response) {
        yield put(getListRequestAction(response.data._links.list));
	} else if (error) {
        yield put(storeErrorsAction(error.response.data));
	}
}

export function* postRequestWithNoData(action) {
	const {response, error} = yield call(postData, action.link.href, null, {headers: {'Session-Token': localStorage.getItem('sessionToken')}});
	if(response) {
        yield put(getListRequestAction(response.data._links.list));
    } else if (error) {
    }
}

export function* watchDeleteTodoRequest() {
	yield* takeEvery(ActionTypes.DELETE_TODO_REQUEST_ACTION, deleteTodoRequest);
}

export function* watchCreateTodoRequest() {
	yield* takeEvery(ActionTypes.CREATE_TODO_REQUEST_ACTION, postRequestWithTodoData);
}

export function* watchDisplaceTodoRequest() {
	yield* takeEvery(ActionTypes.DISPLACE_TODO_REQUEST_ACTION, postRequestWithTodoData);
}

export function* watchUpdateTodoRequest() {
	yield* takeEvery(ActionTypes.UPDATE_TODO_REQUEST_ACTION, putRequestWithTodoData);
}

export function* watchCompleteTodoRequest() {
	yield* takeEvery(ActionTypes.COMPLETE_TODO_REQUEST_ACTION, postRequestWithNoData);
}

export function* watchMoveTodoRequest() {
	yield* takeEvery(ActionTypes.MOVE_TODO_REQUEST_ACTION, postRequestWithNoData);
}

export function* watchPullTodosRequest() {
	yield* takeEvery(ActionTypes.PULL_TODOS_REQUEST_ACTION, postRequestWithNoData);
}

export function* watchEscalateTodosRequest() {
	yield* takeEvery(ActionTypes.ESCALATE_TODOS_REQUEST_ACTION, postRequestWithNoData);
}
