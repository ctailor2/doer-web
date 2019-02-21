import { Link } from '../api/api';
import { List } from '../api/list';
import { ActionTypes } from '../constants/actionTypes';

export interface GetListRequestAction {
    type: ActionTypes.GET_LIST_REQUEST_ACTION;
    link: Link;
}

export const getListRequestAction = (link: Link): GetListRequestAction => ({
    type: ActionTypes.GET_LIST_REQUEST_ACTION,
    link,
});

export interface GetCompletedListRequestAction {
    type: ActionTypes.GET_COMPLETED_LIST_REQUEST_ACTION;
    link: Link;
}

export const getCompletedListRequestAction = (link: Link): GetCompletedListRequestAction => ({
    type: ActionTypes.GET_COMPLETED_LIST_REQUEST_ACTION,
    link,
});

export interface StoreListAction {
    type: ActionTypes.STORE_LIST_ACTION;
    list: List;
}

export const storeListAction = (list: List): StoreListAction => ({
    type: ActionTypes.STORE_LIST_ACTION,
    list,
});

export interface StoreCompletedListAction {
    type: ActionTypes.STORE_COMPLETED_LIST_ACTION;
    list: List;
}

export const storeCompletedListAction = (list: List): StoreCompletedListAction => ({
    type: ActionTypes.STORE_COMPLETED_LIST_ACTION,
    list,
});

export interface UnlockListRequestAction {
    type: ActionTypes.UNLOCK_LIST_REQUEST_ACTION;
    link: Link;
}

export const unlockListRequestAction = (link: Link): UnlockListRequestAction => ({
    type: ActionTypes.UNLOCK_LIST_REQUEST_ACTION,
    link,
});
