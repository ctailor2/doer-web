jest.unmock('../rootSaga');
jest.unmock('../sessionSaga');

import rootSaga from '../rootSaga';
import {fork} from 'redux-saga/effects';
import {watchSignupRequest, watchLoginRequest, watchLogoutRequest} from '../sessionSaga';

describe('rootSaga', () => {
    let iterator = rootSaga();

    it('forks the watch sagas', () => {
        expect(iterator.next().value).toEqual([
            fork(watchSignupRequest),
            fork(watchLoginRequest),
            fork(watchLogoutRequest)
        ]);
    });
});