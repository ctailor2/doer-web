import { ActionTypes } from '../../constants/actionTypes';
import {
    LoginInfo,
    loginRequestAction,
    LoginRequestAction,
    logoutRequestAction,
    SignupInfo,
    signupRequestAction,
    SignupRequestAction,
    storeSessionAction,
} from '../sessionActions';

describe('signupRequestAction', () => {
    it('creates a signup request action with supplied link and data', () => {
        const signupInfo: SignupInfo = {
            email: 'someEmail',
            password: 'somePassword',
            passwordConfirmation: 'somePasswordConfirmation',
         };
        const link = { href: 'http://some.api/signup' };
        expect(signupRequestAction(link, signupInfo)).toEqual({
            type: ActionTypes.SIGNUP_REQUEST_ACTION,
            link,
            signupInfo,
        });
    });
});

describe('loginRequestAction', () => {
    it('creates a login request action with supplied link and data', () => {
        const loginInfo: LoginInfo = { email: 'someEmail', password: 'somePassword' };
        const link = { href: 'http://some.api/login' };
        expect(loginRequestAction(link, loginInfo)).toEqual({
            type: ActionTypes.LOGIN_REQUEST_ACTION,
            link,
            loginInfo,
        });
    });
});

describe('logoutRequestAction', () => {
    it('creates a logout request action', () => {
        expect(logoutRequestAction()).toEqual({
            type: ActionTypes.LOGOUT_REQUEST_ACTION,
        });
    });
});
