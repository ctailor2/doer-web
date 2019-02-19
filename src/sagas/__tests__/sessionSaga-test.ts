import { browserHistory } from 'react-router';
import { takeEvery, takeLatest } from 'redux-saga';
import { call, CallEffect, put, PutEffect } from 'redux-saga/effects';
import { LoginRequestAction, StoreSessionAction } from '../../actions/sessionActions';
import { ActionTypes } from '../../constants/actionTypes';
import { postData } from '../sagaHelper';
import {
    logoutRequest,
    storeSession,
    watchLogoutRequest,
    watchStoreSession,
} from '../sessionSaga';

describe('logoutRequest', () => {
    let iterator: Iterator<void>;

    beforeEach(() => {
        localStorage.setItem('sessionToken', 'socooltoken');
        localStorage.setItem('link', 'someLink');
        browserHistory.push = jest.fn();
        iterator = logoutRequest();
    });

    describe('on request success', () => {
        it('removes token from localStorage', () => {
            iterator.next();
            expect(localStorage.getItem('sessionToken')).toEqual(null);
        });

        it('removes link from localStorage', () => {
            iterator.next();
            iterator.next();
            expect(localStorage.getItem('link')).toEqual(null);
        });

        it('redirects to login', () => {
            iterator.next();
            iterator.next();
            iterator.next();
            expect(browserHistory.push).toBeCalledWith('/login');
        });
    });
});

describe('watchLogoutRequest', () => {
    const iterator = watchLogoutRequest();

    it('calls logout request saga with latest logout request action', () => {
        const expected: any = takeLatest(ActionTypes.LOGOUT_REQUEST_ACTION, logoutRequest);
        expect(iterator.next().value).toEqual(expected.next().value);
    });
});

describe('storeSession', () => {
    let iterator: IterableIterator<void>;

    const action: StoreSessionAction = {
        type: ActionTypes.STORE_SESSION_ACTION,
        token: 'wowCoolToken',
    };

    beforeEach(() => {
        iterator = storeSession(action);
    });

    it('sets token on localStorage', () => {
        iterator.next();
        expect(localStorage.getItem('sessionToken')).toEqual('wowCoolToken');
    });
});

describe('watchStoreSession', () => {
    const iterator = watchStoreSession();

    it('calls store session saga with every store session action', () => {
        const expected: any = takeEvery(ActionTypes.STORE_SESSION_ACTION, storeSession);
        expect(iterator.next().value).toEqual(expected.next().value);
    });
});
