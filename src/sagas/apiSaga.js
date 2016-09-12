import {takeEvery} from 'redux-saga';
import {call} from 'redux-saga/effects';
import {fetchData} from './sagaHelper';
import {browserHistory} from 'react-router';

export function* pingApi(action) {
    const {response, error} = yield call(fetchData, '/v1/pingAuthenticated');
    if(response) {
        // no op
    } else if (error) {
        browserHistory.push('/signup');
    }
}

export function* watchPingApi() {
    yield* takeEvery('PING_API_ACTION', pingApi);
}