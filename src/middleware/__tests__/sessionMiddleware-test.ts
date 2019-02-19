export default undefined;
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { applyMiddleware, createStore } from 'redux';
import { ApplicationAction } from '../../actions/actions';
import { ActionTypes } from '../../constants/actionTypes';
import { client } from '../../sagas/sagaHelper';
import { ApplicationStore, reducer } from '../../store';
import actionCapturingMiddleware from '../../utils/actionCapturingMiddleware';
import sessionMiddleware from '../sessionMiddleware';

describe('session middleware', () => {
    const mockAdapter = new MockAdapter(client);
    const capturedActions: ApplicationAction[] = [];
    const signupRequestAction: ApplicationAction = {
        type: ActionTypes.SIGNUP_REQUEST_ACTION,
        link: { href: 'signupHref' },
        signupInfo: {
            email: 'someEmail',
            password: 'somePassword',
            passwordConfirmation: 'somePasswordConfirmation',
        },
    };
    let store: ApplicationStore;

    beforeEach(() => {
        store = createStore(reducer, applyMiddleware(sessionMiddleware, actionCapturingMiddleware(capturedActions)));
        mockAdapter.reset();
    });

    describe('on successful signup request', () => {
        beforeEach(() => {
            mockAdapter.onPost('signupHref').reply(201, {
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
        const errorResponse = {
            fieldErrors: [{
                field: 'email',
                message: 'no good',
            }],
            globalErrors: [{
                message: 'womp',
            }],
        };

        beforeEach(() => {
            mockAdapter.onPost('signupHref').reply(401, errorResponse);
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
});
