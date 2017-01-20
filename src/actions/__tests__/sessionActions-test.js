jest.unmock('../sessionActions');

import {
	signupRequestAction,
	loginRequestAction,
	logoutRequestAction,
	storeSessionAction
} from '../sessionActions';

describe('signupRequestAction', () => {
    it('creates a signup request action with empty link and empty data by default', () => {
        expect(signupRequestAction()).toEqual({
            type: 'SIGNUP_REQUEST_ACTION',
            link: {},
            data: {}
        });
    });

    it('creates a signup request action with supplied link and data', () => {
        let data = {cool: 'beans'};
        let link = {href: 'http://some.api/signup'};
        expect(signupRequestAction(link, data)).toEqual({
            type: 'SIGNUP_REQUEST_ACTION',
            link: link,
            data: data
        });
    });
});

describe('loginRequestAction', () => {
    it('creates a login request action with empty link and empty data by default', () => {
        expect(loginRequestAction()).toEqual({
            type: 'LOGIN_REQUEST_ACTION',
            link: {},
            data: {}
        });
    });

    it('creates a login request action with supplied link and data', () => {
        let data = {cool: 'beans'};
        let link = {href: 'http://some.api/login'};
        expect(loginRequestAction(link, data)).toEqual({
            type: 'LOGIN_REQUEST_ACTION',
            link: link,
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

describe('storeSessionAction', () => {
	it('creates a store session action with empty string by default', () => {
		expect(storeSessionAction()).toEqual({
			type: 'STORE_SESSION_ACTION',
			token: ''
		});
	});
});