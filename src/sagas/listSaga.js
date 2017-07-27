import * as actionTypes from '../constants/actionTypes';
import {takeEvery} from 'redux-saga';
import {call, put} from 'redux-saga/effects';
import {fetchData} from './sagaHelper';
import {storeListAction} from '../actions/listActions';
import {getTodosRequestAction} from '../actions/todoActions';

export function* getListRequest(action) {
	const {response, error} = yield call(fetchData, action.link.href, {headers: {'Session-Token': localStorage.getItem('sessionToken')}});
	if(response) {
        yield put(storeListAction(response.data.list));
        yield put(getTodosRequestAction(response.data.list._links.todos));
	} else  if (error) {
	}
}

export function* watchGetListRequest() {
	yield* takeEvery(actionTypes.GET_LIST_REQUEST_ACTION, getListRequest);
}
