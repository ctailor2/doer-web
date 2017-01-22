import {fetchData} from './sagaHelper';
import {call, put} from 'redux-saga/effects';
import {storeLinksAction} from '../actions/linkActions';
import {getTodosRequestAction} from '../actions/todoActions';
import * as actionTypes from '../constants/actionTypes';
import {takeEvery} from 'redux-saga';

export function* getHomeResourcesRequest(action) {
    const {response, error} = yield call(fetchData, action.url, {headers: {'Session-Token': localStorage.getItem('sessionToken')}});
    if(response) {
        yield put(getTodosRequestAction(response.data._links.todos));
    } else if (error) {
        // TODO: handle error
    }
}

export function* watchGetHomeResourcesRequest() {
    yield* takeEvery(actionTypes.GET_HOME_RESOURCES_REQUEST_ACTION, getHomeResourcesRequest);
}