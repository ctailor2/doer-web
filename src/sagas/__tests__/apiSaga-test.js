jest.unmock('../apiSaga');
jest.unmock('../sagaHelper');

import {watchPingApi, pingApi} from '../apiSaga';
import {takeEvery} from 'redux-saga';
import {call} from 'redux-saga/effects';
import {fetchData} from '../sagaHelper';
import {browserHistory} from 'react-router';

describe('watchPingApiAction', () => {
    const iterator = watchPingApi();

    it('calls ping api saga with every ping api action', () => {
        expect(iterator.next().value).toEqual(takeEvery('PING_API_ACTION', pingApi).next().value);
    });
});

describe('pingApi', () => {
    let iterator, redirectFn;

    beforeEach(() => {
        iterator = pingApi();
        redirectFn = jest.fn();
        browserHistory.push = redirectFn;
    });

    it('calls api pingAuthenticated endpoint', () => {
        expect(iterator.next().value).toEqual(call(fetchData, '/v1/pingAuthenticated'));
    });

    it('redirects to the signup page on error', () => {
        iterator.next();
        iterator.next({error: 'error'});
        expect(redirectFn).toBeCalledWith('/signup');
    });
});