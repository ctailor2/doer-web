import {
	signupRequestAction,
	loginRequestAction,
	logoutRequestAction,
	storeSessionAction
} from '../sessionActions';
import {ActionTypes} from '../../constants/actionTypes';

describe('signupRequestAction', () => {
    it('creates a signup request action with supplied link and data', () => {
        let data = {cool: 'beans'};
        let link = {href: 'http://some.api/signup'};
        expect(signupRequestAction(link, data)).toEqual({
            type: ActionTypes.SIGNUP_REQUEST_ACTION,
            link: link,
            data: data
        });
    });
});

describe('loginRequestAction', () => {
    it('creates a login request action with supplied link and data', () => {
        let data = {cool: 'beans'};
        let link = {href: 'http://some.api/login'};
        expect(loginRequestAction(link, data)).toEqual({
            type: ActionTypes.LOGIN_REQUEST_ACTION,
            link: link,
            data: data
        });
    });
});

describe('logoutRequestAction', () => {
    it('creates a logout request action', () => {
        expect(logoutRequestAction()).toEqual({
            type: ActionTypes.LOGOUT_REQUEST_ACTION
        });
    });
});