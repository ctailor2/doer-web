import {fetchData} from './sagaHelper';
import {call, put} from 'redux-saga/effects';
import {storeLinksAction} from '../actions/linkActions';
import {ActionTypes} from '../constants/actionTypes';
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
    yield* takeEvery(ActionTypes.GET_BASE_RESOURCES_REQUEST_ACTION, getBaseResourcesRequest);
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
    yield* takeEvery(ActionTypes.GET_ROOT_RESOURCES_REQUEST_ACTION, getRootResourcesRequest);
}

export function* getTodoResourcesRequest(action) {
    const {response, error} = yield call(fetchData, action.link.href, {headers: {'Session-Token': localStorage.getItem('sessionToken')}});
    if(response) {
        yield put(storeLinksAction(response.data._links));
    } else if (error) {
        // TODO: handle error
    }
}

export function* watchGetTodoResourcesRequest() {
    yield* takeEvery(ActionTypes.GET_TODO_RESOURCES_REQUEST_ACTION, getTodoResourcesRequest);
}

export function* getHistoryResourcesRequest(action) {
    const {response, error} = yield call(fetchData, action.link.href, {headers: {'Session-Token': localStorage.getItem('sessionToken')}});
    if(response) {
        yield put(storeLinksAction(response.data._links));
    } else if (error) {
        // TODO: handle error
    }
}

export function* watchGetHistoryResourcesRequest() {
    yield* takeEvery(ActionTypes.GET_HISTORY_RESOURCES_REQUEST_ACTION, getHistoryResourcesRequest);
}