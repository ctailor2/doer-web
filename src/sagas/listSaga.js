import _ from 'lodash';
import * as actionTypes from '../constants/actionTypes';
import {takeEvery} from 'redux-saga';
import {call, put} from 'redux-saga/effects';
import {fetchData, postData} from './sagaHelper';
import {
    storeListAction,
    getListRequestAction,
    storeCompletedListAction,
} from '../actions/listActions';

export function* getListRequest(action) {
	const {response, error} = yield call(fetchData, action.link.href, {headers: {'Session-Token': localStorage.getItem('sessionToken')}});
	if(response) {
        yield put(storeListAction(response.data.list));
	} else  if (error) {
	}
}

export function* watchGetListRequest() {
	yield* takeEvery(actionTypes.GET_LIST_REQUEST_ACTION, getListRequest);
}

export function* getCompletedListRequest(action) {
	const {response, error} = yield call(fetchData, action.link.href, {headers: {'Session-Token': localStorage.getItem('sessionToken')}});
	if(response) {
        yield put(storeCompletedListAction(response.data.list));
	} else  if (error) {
	}
}

export function* watchGetCompletedListRequest() {
	yield* takeEvery(actionTypes.GET_COMPLETED_LIST_REQUEST_ACTION, getCompletedListRequest);
}

export function* unlockListRequest(action) {
	const {response, error} = yield call(postData, action.link.href, null, {headers: {'Session-Token': localStorage.getItem('sessionToken')}});
	if(response) {
        yield put(getListRequestAction(response.data._links.list));
	} else  if (error) {
	}
}

export function* watchUnlockListRequest() {
	yield* takeEvery(actionTypes.UNLOCK_LIST_REQUEST_ACTION, unlockListRequest);
}
