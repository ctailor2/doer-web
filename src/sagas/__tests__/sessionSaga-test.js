jest.unmock('../sagaHelper');
jest.unmock('../sessionSaga');

import {watchSignupRequest, signupRequest} from '../sessionSaga';
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
        redirectFn = jest.fn();
        browserHistory.push = redirectFn;
        iterator = signupRequest(action);
    });

    it('calls signup endpoint with action data', () => {
        expect(iterator.next().value).toEqual(call(postData, '/v1/signup', action.data));
    });

    describe('on request success', () => {
        it('fires signup response action with response on success', () => {
            iterator.next()
            expect(iterator.next({response: {data: 'daterz'}}).value).toEqual(put({type: 'SIGNUP_RESPONSE_ACTION', data: 'daterz'}));
        });

        it('redirects to the root', () => {
            iterator.next()
            iterator.next({response: {data: 'daterz'}});
            iterator.next({response: {data: 'daterz'}});
            expect(redirectFn).toBeCalledWith('/');
        });
    });
});