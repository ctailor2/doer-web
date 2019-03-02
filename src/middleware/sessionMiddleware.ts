import { browserHistory } from "react-router";
import { Dispatch, MiddlewareAPI } from "redux";
import { ApplicationAction } from "../actions/actions";
import { ActionTypes } from "../constants/actionTypes";
import { perform } from "./apiClient";

export default (store: MiddlewareAPI) => (next: Dispatch) => (action: ApplicationAction) => {
    switch (action.type) {
        case ActionTypes.SIGNUP_REQUEST_ACTION: {
            store.dispatch({
                type: ActionTypes.CLEAR_ERRORS_ACTION,
            });
            perform('post', action.type, action.link,
                (signupResult) => {
                    store.dispatch({
                        type: ActionTypes.STORE_SESSION_ACTION,
                        token: signupResult.session.token,
                    });
                    store.dispatch({
                        type: ActionTypes.PERSIST_LINK_ACTION,
                        link: signupResult._links.root,
                    });
                    browserHistory.push("/");
                },
                (error) => {
                    store.dispatch({
                        type: ActionTypes.STORE_ERRORS_ACTION,
                        errors: error,
                    });
                },
                { 'Content-Type': 'application/json' },
                action.signupInfo);
            break;
        }
        case ActionTypes.LOGIN_REQUEST_ACTION: {
            store.dispatch({
                type: ActionTypes.CLEAR_ERRORS_ACTION,
            });
            perform('post', action.type, action.link,
                (signupResult) => {
                    store.dispatch({
                        type: ActionTypes.STORE_SESSION_ACTION,
                        token: signupResult.session.token,
                    });
                    store.dispatch({
                        type: ActionTypes.PERSIST_LINK_ACTION,
                        link: signupResult._links.root,
                    });
                    browserHistory.push('/');
                },
                (error) => {
                    store.dispatch({
                        type: ActionTypes.STORE_ERRORS_ACTION,
                        errors: error,
                    });
                },
                { 'Content-Type': 'application/json' },
                action.loginInfo);
            break;
        }
        case ActionTypes.STORE_SESSION_ACTION: {
            localStorage.setItem("sessionToken", action.token);
            break;
        }
        case ActionTypes.PERSIST_LINK_ACTION: {
            localStorage.setItem("link", action.link.href);
            break;
        }
        case ActionTypes.LOGOUT_REQUEST_ACTION: {
            localStorage.removeItem("sessionToken");
            localStorage.removeItem("link");
            browserHistory.push('/login');
            break;
        }
    }
    next(action);
};
