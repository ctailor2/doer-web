import { Dispatch, MiddlewareAPI } from "redux";
import { ApplicationAction } from "../actions/actions";
import { GetListRequestAction } from "../actions/listActions";
import { ActionTypes } from "../constants/actionTypes";
import { perform } from "./apiClient";

export default (store: MiddlewareAPI) => (next: Dispatch) => (action: ApplicationAction) => {
    switch (action.type) {
        case ActionTypes.GET_LIST_REQUEST_ACTION: {
            const headers = { 'Session-Token': localStorage.getItem('sessionToken') };
            perform('get', action.type, action.link,
                (listResponse) => {
                    store.dispatch({
                        type: ActionTypes.STORE_LIST_ACTION,
                        list: listResponse.list,
                    });
                },
                () => null,
                headers);
            break;
        }
        case ActionTypes.GET_LIST_OPTIONS_REQUEST_ACTION: {
            const headers = { 'Session-Token': localStorage.getItem('sessionToken') };
            perform('get', action.type, action.link,
                (listResponse) => {
                    store.dispatch({
                        type: ActionTypes.STORE_LIST_OPTIONS_ACTION,
                        lists: listResponse.lists,
                    });
                },
                () => null,
                headers);
            break;
        }
        case ActionTypes.GET_COMPLETED_LIST_REQUEST_ACTION: {
            const headers = { 'Session-Token': localStorage.getItem('sessionToken') };
            perform('get', action.type, action.link,
                (completedListResponse) => {
                    store.dispatch({
                        type: ActionTypes.STORE_COMPLETED_LIST_ACTION,
                        list: completedListResponse.list,
                    });
                },
                () => null,
                headers);
            break;
        }
        case ActionTypes.UNLOCK_LIST_REQUEST_ACTION: {
            const headers = { 'Session-Token': localStorage.getItem('sessionToken') };
            perform('post', action.type, action.link,
                (unlockResponse) => {
                    store.dispatch({
                        type: ActionTypes.GET_LIST_REQUEST_ACTION,
                        link: unlockResponse._links.list,
                    });
                },
                () => null,
                headers);
            break;
        }
    }
    next(action);
};
