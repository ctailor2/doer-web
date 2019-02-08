import {
    watchSignupRequest,
    signupRequest,
    watchLoginRequest,
    loginRequest,
    watchLogoutRequest,
    logoutRequest,
    watchStoreSession,
    storeSession
} from '../sessionSaga';
import {takeLatest, takeEvery} from 'redux-saga';
import {call, put} from 'redux-saga/effects';
import {postData, fetchData} from '../sagaHelper';
import {browserHistory} from 'react-router';
import {ActionTypes} from '../../constants/actionTypes';

describe('watchSignupRequest', () => {
    let iterator = watchSignupRequest();

    it('calls signup request saga with latest signup request action', () => {
        expect(iterator.next().value).toEqual(takeLatest(ActionTypes.SIGNUP_REQUEST_ACTION, signupRequest).next().value);
    });
});

describe('signupRequest', () => {
    let iterator;

	let url = 'http://some.api/someLink';
    let action = {
        type: ActionTypes.SIGNUP_REQUEST_ACTION,
        data: {cool: 'beans'},
        link: {href: url}
    };

    beforeEach(() => {
        iterator = signupRequest(action);
        browserHistory.push = jest.fn();
    });

    it('fires clear errors action', () => {
        expect(iterator.next().value)
            .toEqual(put({type: 'CLEAR_ERRORS_ACTION'}));
    });

    it('calls endpoint with action href and action data', () => {
        iterator.next();
        expect(iterator.next().value).toEqual(call(postData, url, action.data));
    });

    describe('on request success', () => {
        let rootLink = {href: 'http://some.api/root'};
        let response = {response: {data: {
            session: {
                token: 'tokenz'
            },
            _links: {
                root: rootLink
            }
        }}};

        it('fires store session action', () => {
            iterator.next();
            iterator.next();
            expect(iterator.next(response).value)
                .toEqual(put({type: ActionTypes.STORE_SESSION_ACTION, token: 'tokenz'}));
        });

        it('fires persist link action', () => {
            iterator.next();
            iterator.next();
            iterator.next(response);
            expect(iterator.next(response).value)
                .toEqual(put({type: ActionTypes.PERSIST_LINK_ACTION, link: rootLink}));
        });

		it('redirects to the root', () => {
			iterator.next();
			iterator.next();
			iterator.next(response);
			iterator.next(response);
			iterator.next(response);
			expect(browserHistory.push).toBeCalledWith('/');
		});
    });

    describe('on request failure', () => {
        let errors = {
            fieldErrors: [],
            globalErrors: []
        };
        let response = {error: {response: {data: errors}}};

        it('fires store errors action', () => {
			iterator.next();
            iterator.next();
            expect(iterator.next(response).value)
                .toEqual(put({type: 'STORE_ERRORS_ACTION', errors: errors}));
        });
    });
});

describe('watchLoginRequest', () => {
    let iterator = watchLoginRequest();

    it('calls login request saga with latest login request action', () => {
        expect(iterator.next().value).toEqual(takeLatest(ActionTypes.LOGIN_REQUEST_ACTION, loginRequest).next().value);
    });
});

describe('loginRequest', () => {
    let iterator;

	let url = 'http://some.api/someLink';
    let action = {
        type: ActionTypes.LOGIN_REQUEST_ACTION,
        data: {cool: 'beans'},
        link: {href: url}
    };

    beforeEach(() => {
        iterator = loginRequest(action);
        browserHistory.push = jest.fn();
    });

    it('fires clear errors action', () => {
        expect(iterator.next().value).toEqual(put({type: 'CLEAR_ERRORS_ACTION'}));
    });

    it('calls endpoint with action href and action data', () => {
        iterator.next();
        expect(iterator.next().value).toEqual(call(postData, url, action.data));
    });

    describe('on request success', () => {
        let rootLink = {href: 'http://some.api/root'};
        let response = {response: {data: {
            session: {
                token: 'tokenz'
            },
            _links: {
                root: rootLink
            }
        }}};

        it('fires store session action', () => {
            iterator.next();
            iterator.next();
            expect(iterator.next(response).value)
                .toEqual(put({type: ActionTypes.STORE_SESSION_ACTION, token: 'tokenz'}));
        });

        it('fires persist link action', () => {
            iterator.next();
            iterator.next();
            iterator.next(response);
            expect(iterator.next(response).value)
                .toEqual(put({type: ActionTypes.PERSIST_LINK_ACTION, link: rootLink}));
        });

		it('redirects to the root', () => {
			iterator.next();
			iterator.next();
			iterator.next(response);
			iterator.next(response);
			iterator.next(response);
			expect(browserHistory.push).toBeCalledWith('/');
		});
    });

    describe('on request failure', () => {
        let errors = {
            fieldErrors: [],
            globalErrors: []
        };
        let response = {error: {response: {data: errors}}};

        it('fires store errors action', () => {
            iterator.next();
            iterator.next();
            expect(iterator.next(response).value)
                .toEqual(put({type: 'STORE_ERRORS_ACTION', errors: errors}));
        });
    });
});

describe('logoutRequest', () => {
    let iterator;

    let action = {
        type: ActionTypes.LOGOUT_REQUEST_ACTION
    };

    beforeEach(() => {
        localStorage.setItem('sessionToken', 'socooltoken');
        localStorage.setItem('link', 'someLink');
        browserHistory.push = jest.fn();
        iterator = logoutRequest(action);
    });

    describe('on request success', () => {
        it('removes token from localStorage', () => {
            iterator.next();
            expect(localStorage.getItem('sessionToken')).toEqual(null);
        });

        it('removes link from localStorage', () => {
            iterator.next();
            iterator.next();
            expect(localStorage.getItem('link')).toEqual(null);
        });

        it('redirects to login', () => {
            iterator.next();
            iterator.next();
            iterator.next();
            expect(browserHistory.push).toBeCalledWith('/login');
        });
    });
});

describe('watchLogoutRequest', () => {
    let iterator = watchLogoutRequest();

    it('calls logout request saga with latest logout request action', () => {
        expect(iterator.next().value).toEqual(takeLatest(ActionTypes.LOGOUT_REQUEST_ACTION, logoutRequest).next().value);
    });
});

describe('storeSession', () => {
    let iterator;

    let action = {
        type: ActionTypes.STORE_SESSION_ACTION,
        token: 'wowCoolToken'
    };

    beforeEach(() => {
        iterator = storeSession(action);
    });

    it('sets token on localStorage', () => {
        iterator.next();
        expect(localStorage.getItem('sessionToken')).toEqual('wowCoolToken');
    });
});

describe('watchStoreSession', () => {
	let iterator = watchStoreSession();

	it('calls store session saga with every store session action', () => {
        expect(iterator.next().value).toEqual(takeEvery(ActionTypes.STORE_SESSION_ACTION, storeSession).next().value);
	});
});