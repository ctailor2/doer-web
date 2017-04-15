import {fetchData} from './sagaHelper';
import {call, put} from 'redux-saga/effects';
import {storeLinksAction} from '../actions/linkActions';
import {getTodosRequestAction, getCompletedTodosRequestAction} from '../actions/todoActions';
import * as actionTypes from '../constants/actionTypes';
import {takeEvery} from 'redux-saga';

const baseResourcesPath = '/v1/resources/base';

export function* getBaseResourcesRequest() {
    const {response, error} = yield call(fetchData, baseResourcesPath);
    if(response) {
        yield put(storeLinksAction(response.data._links));
    } else if (error) {
        // TODO: handle error
    }
}

export function* watchGetBaseResourcesRequest() {
    yield* takeEvery(actionTypes.GET_BASE_RESOURCES_REQUEST_ACTION, getBaseResourcesRequest);
}

export function* getRootResourcesRequest(action) {
    const {response, error} = yield call(fetchData, action.link.href, {headers: {'Session-Token': localStorage.getItem('sessionToken')}});
    if(response) {
        yield put(storeLinksAction(response.data._links));
    } else if (error) {
        // TODO: handle error
    }
}

export function* watchGetRootResourcesRequest() {
    yield* takeEvery(actionTypes.GET_ROOT_RESOURCES_REQUEST_ACTION, getRootResourcesRequest);
}

export function* getTodoResourcesRequest(action) {
    const {response, error} = yield call(fetchData, action.link.href, {headers: {'Session-Token': localStorage.getItem('sessionToken')}});
    if(response) {
        yield put(storeLinksAction(response.data._links));
        yield put(getTodosRequestAction(response.data._links.todos));
    } else if (error) {
        // TODO: handle error
    }
}

export function* watchGetTodoResourcesRequest() {
    yield* takeEvery(actionTypes.GET_TODO_RESOURCES_REQUEST_ACTION, getTodoResourcesRequest);
}

export function* getHistoryResourcesRequest(action) {
    const {response, error} = yield call(fetchData, action.link.href, {headers: {'Session-Token': localStorage.getItem('sessionToken')}});
    if(response) {
        yield put(storeLinksAction(response.data._links));
        yield put(getCompletedTodosRequestAction(response.data._links.completedTodos));
    } else if (error) {
        // TODO: handle error
    }
}

export function* watchGetHistoryResourcesRequest() {
    yield* takeEvery(actionTypes.GET_HISTORY_RESOURCES_REQUEST_ACTION, getHistoryResourcesRequest);
}