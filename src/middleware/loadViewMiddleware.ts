import { Dispatch, MiddlewareAPI } from "redux";
import { ApplicationAction } from "../actions/actions";
import { storeLinksAction } from "../actions/linkActions";
import { getListOptionsRequestAction, getListRequestAction } from "../actions/listActions";
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
                    perform('get', ActionTypes.GET_LIST_RESOURCES_REQUEST_ACTION,
                    rootResources._links.listResources,
                    (listResources) => {
                        store.dispatch(storeLinksAction(listResources._links));
                        store.dispatch(getListOptionsRequestAction(listResources._links.lists));
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
                        store.dispatch(storeLinksAction(historyResources._links));
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
