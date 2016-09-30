import * as actionTypes from '../constants/actionTypes';
import {takeEvery} from 'redux-saga';
import {call, put} from 'redux-saga/effects';
import {fetchData} from './sagaHelper';
import {storeTodosAction} from '../actions/todoActions';

export function* getTodosRequest(action) {
	const {response, error} = yield call(fetchData, '/v1/todos', {headers: {'Session-Token': localStorage.getItem('sessionToken')}});
	if(response) {
		yield put(storeTodosAction(response.data));
	} else  if (error) {
	}
}

export function* watchGetTodosRequest() {
	yield* takeEvery(actionTypes.GET_TODOS_REQUEST_ACTION, getTodosRequest);
}