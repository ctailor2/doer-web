import {takeLatest} from 'redux-saga';
import {ActionTypes} from '../constants/actionTypes';

export function* persistLink(action) {
    yield localStorage.setItem('link', action.link.href);
}

export function* watchPersistLink() {
    yield* takeLatest(ActionTypes.PERSIST_LINK_ACTION, persistLink);
}