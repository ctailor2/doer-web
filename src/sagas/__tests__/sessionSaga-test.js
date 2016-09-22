jest.unmock('../sagaHelper');
jest.unmock('../sessionSaga');

import {
    watchSignupRequest,
    signupRequest,
    watchLoginRequest,
    loginRequest,
    watchLogoutRequest,
    logoutRequest
} from '../sessionSaga';
import {takeLatest} from 'redux-saga';
import {call, put} from 'redux-saga/effects';
import {postData} from '../sagaHelper';
import {browserHistory} from 'react-router';

describe('watchSignupRequest', () => {
    let iterator = watchSignupRequest();

    it('calls signup request saga with latest signup request action', () => {
        expect(iterator.next().value).toEqual(takeLatest('SIGNUP_REQUEST_ACTION', signupRequest).next().value);
    });
});

describe('signupRequest', () => {
    let iterator, redirectFn;

    let action = {
        type: 'SIGNUP_REQUEST_ACTION',
        data: {cool: 'beans'}
    };

    beforeEach(() => {
        localStorage.setItem = jest.fn();
        browserHistory.push = jest.fn();
        iterator = signupRequest(action);
    });

    it('calls signup endpoint with action data', () => {
        expect(iterator.next().value).toEqual(call(postData, '/v1/signup', action.data));
    });

    describe('on request success', () => {
        it('sets token on localStorage', () => {
            iterator.next();
            iterator.next({response: {data: {sessionToken: {token: 'tokenz'}}}});
            expect(localStorage.setItem).toBeCalledWith('sessionToken', 'tokenz');
        });

        it('redirects to the root', () => {
            iterator.next();
            iterator.next({response: {data: {sessionToken: {token: 'tokenz'}}}});
            iterator.next({response: {data: {sessionToken: {token: 'tokenz'}}}});
            expect(browserHistory.push).toBeCalledWith('/');
        });
    });
});

describe('watchLoginRequest', () => {
    let iterator = watchLoginRequest();

    it('calls login request saga with latest login request action', () => {
        expect(iterator.next().value).toEqual(takeLatest('LOGIN_REQUEST_ACTION', loginRequest).next().value);
    });
});

describe('loginRequest', () => {
    let iterator, redirectFn;

    let action = {
        type: 'LOGIN_REQUEST_ACTION',
        data: {cool: 'beans'}
    };

    beforeEach(() => {
        localStorage.setItem = jest.fn();
        browserHistory.push = jest.fn();
        iterator = loginRequest(action);
    });

    it('calls login endpoint with action data', () => {
        expect(iterator.next().value).toEqual(call(postData, '/v1/login', action.data));
    });

    describe('on request success', () => {
        it('sets token on localStorage', () => {
            iterator.next()
            iterator.next({response: {data: {sessionToken: {token: 'tokenz'}}}});
            expect(localStorage.setItem).toBeCalledWith('sessionToken', 'tokenz');
        });

        it('redirects to the root', () => {
            iterator.next()
            iterator.next({response: {data: {sessionToken: {token: 'tokenz'}}}});
            iterator.next({response: {data: {sessionToken: {token: 'tokenz'}}}});
            expect(browserHistory.push).toBeCalledWith('/');
        });
    });
});

describe('logoutRequest', () => {
    let iterator, redirectFn;

    let action = {
        type: 'LOGOUT_REQUEST_ACTION'
    };

    beforeEach(() => {
        localStorage.getItem = jest.fn(() => {return 'socooltoken'});
        browserHistory.push = jest.fn();
        iterator = logoutRequest(action);
    });

    it('calls logout endpoint with session token header', () => {
        expect(iterator.next().value).toEqual(call(postData, '/v1/logout', {}, {headers: {'Session-Token': 'socooltoken'}}));
    });

    describe('on request success', () => {
        it('redirects to login', () => {
            iterator.next()
            iterator.next({response: {}});
            expect(browserHistory.push).toBeCalledWith('/login');
        });
    });
});

describe('watchLogoutRequest', () => {
    let iterator = watchLogoutRequest();

    it('calls logout request saga with latest logout request action', () => {
        expect(iterator.next().value).toEqual(takeLatest('LOGOUT_REQUEST_ACTION', logoutRequest).next().value);
    });
});