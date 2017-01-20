import {fetchData} from './sagaHelper';
import {call, put} from 'redux-saga/effects';
import {storeLinksAction} from '../actions/linkActions';
import * as actionTypes from '../constants/actionTypes';
import {takeEvery} from 'redux-saga';

export function* getBaseResourcesRequest() {
    const {response, error} = yield call(fetchData, '/v1/baseResources');
    if(response) {
        yield put(storeLinksAction(response.data._links));
    } else if (error) {
        // TODO: handle error
    }
}

export function* watchGetBaseResourcesRequest() {
    yield* takeEvery(actionTypes.GET_BASE_RESOURCES_REQUEST_ACTION, getBaseResourcesRequest);
}