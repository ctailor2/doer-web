import { browserHistory } from 'react-router';
import { takeEvery, takeLatest } from 'redux-saga';
import { call, CallEffect, put, PutEffect } from 'redux-saga/effects';
import { LoginRequestAction, StoreSessionAction } from '../../actions/sessionActions';
import { ActionTypes } from '../../constants/actionTypes';
import { postData } from '../sagaHelper';
import {
    loginRequest,
    logoutRequest,
    storeSession,
    watchLoginRequest,
    watchLogoutRequest,
    watchStoreSession,
} from '../sessionSaga';

describe('watchLoginRequest', () => {
    const iterator = watchLoginRequest();

    it('calls login request saga with latest login request action', () => {
        const expected: any = takeLatest(ActionTypes.LOGIN_REQUEST_ACTION, loginRequest);
        expect(iterator.next().value).toEqual(expected.next().value);
    });
});

describe('loginRequest', () => {
    let iterator: Iterator<void | PutEffect<{ type: ActionTypes; }> | CallEffect>;

    const url = 'http://some.api/someLink';
    const action: LoginRequestAction = {
        type: ActionTypes.LOGIN_REQUEST_ACTION,
        loginInfo: {
            email: 'someEmail',
            password: 'somePassword',
        },
        link: { href: url },
    };

    beforeEach(() => {
        iterator = loginRequest(action);
        browserHistory.push = jest.fn();
    });

    it('fires clear errors action', () => {
        expect(iterator.next().value).toEqual(put({ type: ActionTypes.CLEAR_ERRORS_ACTION }));
    });

    it('calls endpoint with action href and action data', () => {
        iterator.next();
        expect(iterator.next().value).toEqual(call(postData, url, action.loginInfo));
    });

    describe('on request success', () => {
        const rootLink = { href: 'http://some.api/root' };
        const response = {
            response: {
                data: {
                    session: {
                        token: 'tokenz',
                    },
                    _links: {
                        root: rootLink,
                    },
                }
            }
        };

        it('fires store session action', () => {
            iterator.next();
            iterator.next();
            expect(iterator.next(response).value)
                .toEqual(put({ type: ActionTypes.STORE_SESSION_ACTION, token: 'tokenz' }));
        });

        it('fires persist link action', () => {
            iterator.next();
            iterator.next();
            iterator.next(response);
            expect(iterator.next(response).value)
                .toEqual(put({ type: ActionTypes.PERSIST_LINK_ACTION, link: rootLink }));
        });

        it('redirects to the root', () => {
            iterator.next();
            iterator.next();
            iterator.next(response);
            iterator.next(response);
            iterator.next(response);
            expect(browserHistory.push).toBeCalledWith('/');
        });
    });

    describe('on request failure', () => {
        const errors = {
            fieldErrors: [],
            globalErrors: [],
        };
        const response = { error: { response: { data: errors } } };

        it('fires store errors action', () => {
            iterator.next();
            iterator.next();
            expect(iterator.next(response).value)
                .toEqual(put({ type: ActionTypes.STORE_ERRORS_ACTION, errors }));
        });
    });
});

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
