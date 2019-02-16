import {
	signupRequestAction,
	loginRequestAction,
	logoutRequestAction,
	storeSessionAction,
    SignupInfo,
    LoginInfo,
    LoginRequestAction,
    SignupRequestAction
} from '../sessionActions';
import {ActionTypes} from '../../constants/actionTypes';

describe('signupRequestAction', () => {
    it('creates a signup request action with supplied link and data', () => {
        let signupInfo: SignupInfo = {email: 'someEmail', password: 'somePassword', passwordConfirmation: 'somePasswordConfirmation'};
        let link = {href: 'http://some.api/signup'};
        expect(signupRequestAction(link, signupInfo)).toEqual({
            type: ActionTypes.SIGNUP_REQUEST_ACTION,
            link: link,
            signupInfo: signupInfo,
        });
    });
});

describe('loginRequestAction', () => {
    it('creates a login request action with supplied link and data', () => {
        let loginInfo: LoginInfo = {email: 'someEmail', password: 'somePassword'};
        let link = {href: 'http://some.api/login'};
        expect(loginRequestAction(link, loginInfo)).toEqual({
            type: ActionTypes.LOGIN_REQUEST_ACTION,
            link: link,
            loginInfo: loginInfo,
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