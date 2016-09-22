jest.unmock('../sessionActions');

import {signupRequestAction, loginRequestAction, logoutRequestAction} from '../sessionActions';

describe('signupRequestAction', () => {
    it('creates a signup request action with empty data by default', () => {
        expect(signupRequestAction()).toEqual({
            type: 'SIGNUP_REQUEST_ACTION',
            data: {}
        });
    });

    it('creates a signup request action with supplied data', () => {
        let data = {cool: 'beans'};
        expect(signupRequestAction(data)).toEqual({
            type: 'SIGNUP_REQUEST_ACTION',
            data: data
        });
    });
});

describe('loginRequestAction', () => {
    it('creates a login request action with empty data by default', () => {
        expect(loginRequestAction()).toEqual({
            type: 'LOGIN_REQUEST_ACTION',
            data: {}
        });
    });

    it('creates a login request action with supplied data', () => {
        let data = {cool: 'beans'};
        expect(loginRequestAction(data)).toEqual({
            type: 'LOGIN_REQUEST_ACTION',
            data: data
        });
    });
});

describe('logoutRequestAction', () => {
    it('creates a logout request action', () => {
        expect(logoutRequestAction()).toEqual({
            type: 'LOGOUT_REQUEST_ACTION'
        });
    });
});