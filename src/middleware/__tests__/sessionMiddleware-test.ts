export default undefined;
import MockAdapter from 'axios-mock-adapter';
import { applyMiddleware, createStore } from 'redux';
import { ApplicationAction } from '../../actions/actions';
import { ActionTypes } from '../../constants/actionTypes';
import { client } from '../apiClient';
import { ApplicationStore, reducer } from '../../store';
import actionCapturingMiddleware from '../../utils/actionCapturingMiddleware';
import sessionMiddleware from '../sessionMiddleware';

describe('session middleware', () => {
    const mockAdapter = new MockAdapter(client);
    const signupRequestAction: ApplicationAction = {
        type: ActionTypes.SIGNUP_REQUEST_ACTION,
        link: { href: 'signupHref' },
        signupInfo: {
            email: 'someEmail',
            password: 'somePassword',
            passwordConfirmation: 'somePasswordConfirmation',
        },
    };
    const loginRequestAction: ApplicationAction = {
        type: ActionTypes.LOGIN_REQUEST_ACTION,
        link: { href: 'loginHref' },
        loginInfo: {
            email: 'someEmail',
            password: 'somePassword',
        },
    };
    const errorResponse = {
        fieldErrors: [{
            field: 'email',
            message: 'no good',
        }],
        globalErrors: [{
            message: 'womp',
        }],
    };
    let capturedActions: ApplicationAction[];
    let store: ApplicationStore;

    beforeEach(() => {
        capturedActions = [];
        store = createStore(reducer, applyMiddleware(sessionMiddleware, actionCapturingMiddleware(capturedActions)));
        mockAdapter.reset();
        localStorage.clear();
    });

    it('clears errors on signup request', () => {
        store.dispatch(signupRequestAction);

        expect(capturedActions).toContainEqual({
            type: ActionTypes.CLEAR_ERRORS_ACTION,
        });
    });

    describe('on successful signup request', () => {
        beforeEach(() => {
            mockAdapter
                .onPost(signupRequestAction.link.href, signupRequestAction.signupInfo)
                .reply(201, {
                    session: {
                        token: 'someToken',
                    },
                    _links: {
                        root: {
                            href: 'rootHref',
                        },
                    },
                });
            store.dispatch(signupRequestAction);
        });

        it('stores the session token', (done) => {
            setTimeout(() => {
                expect(capturedActions).toContainEqual({
                    type: ActionTypes.STORE_SESSION_ACTION,
                    token: 'someToken',
                });
                done();
            });
        });

        it('stores the root link', (done) => {
            setTimeout(() => {
                expect(capturedActions).toContainEqual({
                    type: ActionTypes.PERSIST_LINK_ACTION,
                    link: { href: 'rootHref' },
                });
                done();
            });
        });
    });

    describe('on failed signup request', () => {
        beforeEach(() => {
            mockAdapter
                .onPost(signupRequestAction.link.href, signupRequestAction.signupInfo)
                .reply(401, errorResponse);
            store.dispatch(signupRequestAction);
        });

        it('stores the errors', (done) => {
            setTimeout(() => {
                expect(capturedActions).toContainEqual({
                    type: ActionTypes.STORE_ERRORS_ACTION,
                    errors: errorResponse,
                });
                done();
            });
        });
    });

    it('clears errors on login request', () => {
        store.dispatch(loginRequestAction);

        expect(capturedActions).toContainEqual({
            type: ActionTypes.CLEAR_ERRORS_ACTION,
        });
    });

    describe('on successful login request', () => {
        beforeEach(() => {
            mockAdapter
                .onPost(loginRequestAction.link.href, loginRequestAction.loginInfo)
                .reply(200, {
                    session: {
                        token: 'someToken',
                    },
                    _links: {
                        root: { href: 'rootHref' },
                    },
                });
            store.dispatch(loginRequestAction);
        });

        it('stores the session token', (done) => {
            setTimeout(() => {
                expect(capturedActions).toContainEqual({
                    type: ActionTypes.STORE_SESSION_ACTION,
                    token: 'someToken',
                });
                done();
            });
        });

        it('stores the root link', (done) => {
            setTimeout(() => {
                expect(capturedActions).toContainEqual({
                    type: ActionTypes.PERSIST_LINK_ACTION,
                    link: { href: 'rootHref' },
                });
                done();
            });
        });
    });

    describe('on failed signup request', () => {
        beforeEach(() => {
            mockAdapter
                .onPost(loginRequestAction.link.href, loginRequestAction.loginInfo)
                .reply(401, errorResponse);
            store.dispatch(loginRequestAction);
        });

        it('stores the errors', (done) => {
            setTimeout(() => {
                expect(capturedActions).toContainEqual({
                    type: ActionTypes.STORE_ERRORS_ACTION,
                    errors: errorResponse,
                });
                done();
            });
        });
    });

    it('stores the sessionToken in localstorage', () => {
        store.dispatch({
            type: ActionTypes.STORE_SESSION_ACTION,
            token: 'someToken',
        });
        expect(localStorage.getItem('sessionToken')).toEqual('someToken');
    });

    it('clears the sessionToken from localStorage on logout', () => {
        store.dispatch({
            type: ActionTypes.STORE_SESSION_ACTION,
            token: 'someToken',
        });
        store.dispatch({
            type: ActionTypes.LOGOUT_REQUEST_ACTION,
        });
        expect(localStorage.getItem("sessionToken")).toBeNull();
    });

    it('stores the root link in localStorage', () => {
        store.dispatch({
            type: ActionTypes.PERSIST_LINK_ACTION,
            link: { href: 'someLinkToPersist' },
        });
        expect(localStorage.getItem('link')).toEqual('someLinkToPersist');
    });

    it('clears the link from localStorage on logout', () => {
        store.dispatch({
            type: ActionTypes.PERSIST_LINK_ACTION,
            link: { href: 'persistLink' },
        });
        store.dispatch({
            type: ActionTypes.LOGOUT_REQUEST_ACTION,
        });
        expect(localStorage.getItem("link")).toBeNull();
    });
});
