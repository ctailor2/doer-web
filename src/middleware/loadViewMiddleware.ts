import { Dispatch, MiddlewareAPI } from "redux";
import { ApplicationAction } from "../actions/actions";
import { ActionTypes } from "../constants/actionTypes";
import { perform } from "./apiClient";

export default (store: MiddlewareAPI) => (next: Dispatch) => (action: ApplicationAction) => {
    switch (action.type) {
        case ActionTypes.LOAD_TODOS_VIEW_ACTION: {
            const rootResourcesLink = localStorage.getItem('link');
            if (!rootResourcesLink) {
                break;
            }
            const headers = { 'Session-Token': localStorage.getItem('sessionToken') };
            perform('get', ActionTypes.GET_ROOT_RESOURCES_REQUEST_ACTION, { href: rootResourcesLink },
                (rootResources) => {
                    perform('get', ActionTypes.GET_TODO_RESOURCES_REQUEST_ACTION,
                    rootResources._links.todoResources,
                    (todoResources) => {
                        store.dispatch({
                            type: ActionTypes.STORE_LINKS_ACTION,
                            links: todoResources._links,
                        });
                        store.dispatch({
                            type: ActionTypes.GET_LIST_REQUEST_ACTION,
                            link: todoResources._links.list,
                        });
                    },
                    () => null,
                    headers);
                },
                () => null,
                headers);
            break;
        }
        case ActionTypes.LOAD_HISTORY_VIEW_ACTION: {
            const rootResourcesLink = localStorage.getItem('link');
            if (!rootResourcesLink) {
                break;
            }
            const headers = { 'Session-Token': localStorage.getItem('sessionToken') };
            perform('get', ActionTypes.GET_ROOT_RESOURCES_REQUEST_ACTION, { href: rootResourcesLink },
                (rootResources) => {
                    perform('get', ActionTypes.GET_HISTORY_RESOURCES_REQUEST_ACTION,
                    rootResources._links.historyResources,
                    (historyResources) => {
                        store.dispatch({
                            type: ActionTypes.STORE_LINKS_ACTION,
                            links: historyResources._links,
                        });
                        store.dispatch({
                            type: ActionTypes.GET_COMPLETED_LIST_REQUEST_ACTION,
                            link: historyResources._links.completedList,
                        });
                    },
                    () => null,
                    headers);
                },
                () => null,
                headers);
            break;
        }
    }
    next(action);
};
