import { Dispatch, MiddlewareAPI } from "redux";
import { ApplicationAction } from "../actions/actions";
import { ActionTypes } from "../constants/actionTypes";
import { perform } from "../sagas/sagaHelper";

export const rootLink = { href: '/v1' };

export default (store: MiddlewareAPI) => (next: Dispatch) => (action: ApplicationAction) => {
    switch (action.type) {
        case ActionTypes.GET_BASE_RESOURCES_REQUEST_ACTION: {
            perform('get', action.type, rootLink, (baseResources) => {
                store.dispatch({
                    type: ActionTypes.STORE_LINKS_ACTION,
                    links: baseResources._links,
                });
            });
            break;
        }
        case ActionTypes.GET_ROOT_RESOURCES_REQUEST_ACTION:
        case ActionTypes.GET_TODO_RESOURCES_REQUEST_ACTION:
        case ActionTypes.GET_HISTORY_RESOURCES_REQUEST_ACTION: {
            perform('get', action.type, action.link,
                (resources) => {
                    store.dispatch({
                        type: ActionTypes.STORE_LINKS_ACTION,
                        links: resources._links,
                    });
                },
                undefined,
                { 'Session-Token': localStorage.getItem('sessionToken') });
            break;
        }
    }
    next(action);
};
