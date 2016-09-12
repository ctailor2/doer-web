import {watchPingApi} from './apiSaga';
import {fork} from 'redux-saga/effects';

export default function* rootSaga() {
    yield [
        fork(watchPingApi)
    ];
}