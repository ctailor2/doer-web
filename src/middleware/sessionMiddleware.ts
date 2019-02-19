import { browserHistory } from "react-router";
import { Dispatch, MiddlewareAPI } from "redux";
import { ApplicationAction } from "../actions/actions";
import { ActionTypes } from "../constants/actionTypes";
import { postCommand } from "../sagas/sagaHelper";

export default (store: MiddlewareAPI) => (next: Dispatch) => (action: ApplicationAction) => {
    switch (action.type) {
        case ActionTypes.SIGNUP_REQUEST_ACTION: {
            store.dispatch({
                type: ActionTypes.CLEAR_ERRORS_ACTION,
            });
            postCommand(action.type, action.link, action.signupInfo,
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
                });
            break;
        }
        case ActionTypes.LOGIN_REQUEST_ACTION: {
            store.dispatch({
                type: ActionTypes.CLEAR_ERRORS_ACTION,
            });
            postCommand(action.type, action.link, action.loginInfo,
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
                });
            break;
        }
    }
    next(action);
};
