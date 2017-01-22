import {takeLatest} from 'redux-saga';
import * as actionTypes from '../constants/actionTypes';

export function* persistLink(action) {
    yield localStorage.setItem('link', action.link.href);
}

export function* watchPersistLink() {
    yield* takeLatest(actionTypes.PERSIST_LINK_ACTION, persistLink);
}