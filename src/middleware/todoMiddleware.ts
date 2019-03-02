import { Dispatch, MiddlewareAPI } from "redux";
import { ApplicationAction } from "../actions/actions";
import { ActionTypes } from "../constants/actionTypes";
import { perform } from "./apiClient";

export default (store: MiddlewareAPI) => (next: Dispatch) => (action: ApplicationAction) => {
    const headers = { 'Session-Token': localStorage.getItem('sessionToken') };
    switch (action.type) {
        case ActionTypes.DELETE_TODO_REQUEST_ACTION: {
            perform('delete', action.type, action.link,
                (response) => {
                    store.dispatch({
                        type: ActionTypes.GET_LIST_REQUEST_ACTION,
                        link: response._links.list,
                    });
                },
                () => null,
                headers);
            break;
        }
        case ActionTypes.CREATE_TODO_REQUEST_ACTION:
        case ActionTypes.DISPLACE_TODO_REQUEST_ACTION: {
            store.dispatch({
                type: ActionTypes.CLEAR_ERRORS_ACTION,
            });
            perform('post', action.type, action.link,
                (response) => {
                    store.dispatch({
                        type: ActionTypes.GET_LIST_REQUEST_ACTION,
                        link: response._links.list,
                    });
                },
                (errors) => {
                    store.dispatch({
                        type: ActionTypes.STORE_ERRORS_ACTION,
                        errors,
                    });
                },
                headers,
                action.todo,
            );
            break;
        }
        case ActionTypes.UPDATE_TODO_REQUEST_ACTION: {
            store.dispatch({
                type: ActionTypes.CLEAR_ERRORS_ACTION,
            });
            perform('put', action.type, action.link,
                (response) => {
                    store.dispatch({
                        type: ActionTypes.GET_LIST_REQUEST_ACTION,
                        link: response._links.list,
                    });
                },
                (errors) => {
                    store.dispatch({
                        type: ActionTypes.STORE_ERRORS_ACTION,
                        errors,
                    });
                },
                headers,
                action.todo,
            );
            break;
        }
        case ActionTypes.COMPLETE_TODO_REQUEST_ACTION:
        case ActionTypes.MOVE_TODO_REQUEST_ACTION:
        case ActionTypes.PULL_TODOS_REQUEST_ACTION:
        case ActionTypes.ESCALATE_TODOS_REQUEST_ACTION: {
            perform('post', action.type, action.link,
            (response) => {
                store.dispatch({
                    type: ActionTypes.GET_LIST_REQUEST_ACTION,
                    link: response._links.list,
                });
            },
            () => null,
            headers);
            break;
        }
    }
    next(action);
};
