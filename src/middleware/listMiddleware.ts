import { Dispatch, MiddlewareAPI } from "redux";
import { ApplicationAction } from "../actions/actions";
import { getListRequestAction, storeListOptionsAction } from "../actions/listActions";
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
                        listLink: listResponse._links.self,
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
                    const firstList = listResponse.lists[0];
                    store.dispatch(getListRequestAction(firstList.name, firstList._links.list));
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
                (response) => {
                    store.dispatch({
                        type: ActionTypes.STORE_LIST_ACTION,
                        list: response.list,
                        listLink: response._links.list,
                    });
                },
                () => null,
                headers);
            break;
        }
        case ActionTypes.CREATE_LIST_ACTION: {
            const headers = { 'Session-Token': localStorage.getItem('sessionToken') };
            perform('post', action.type, action.link,
                (createListResponse) => {
                    store.dispatch({
                        type: ActionTypes.GET_LIST_OPTIONS_REQUEST_ACTION,
                        link: createListResponse._links.lists,
                    });
                },
                () => null,
                headers,
                action.list);
            break;
        }
    }
    next(action);
};
