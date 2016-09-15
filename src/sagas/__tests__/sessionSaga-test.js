jest.unmock('../sagaHelper');
jest.unmock('../sessionSaga');

import {watchSignupRequest, signupRequest, watchLoginRequest, loginRequest} from '../sessionSaga';
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