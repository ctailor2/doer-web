import { Link } from '../api/api';
import { CompletedList } from '../api/completedList';
import { List, ListName, ListOption } from '../api/list';
import { ActionTypes } from '../constants/actionTypes';

export interface CreateListAction {
    type: ActionTypes.CREATE_LIST_ACTION;
    link: Link;
    list: ListName;
}

export const createListAction = (link: Link, listForm: ListName): CreateListAction => ({
    type: ActionTypes.CREATE_LIST_ACTION,
    link,
    list: listForm,
});

export interface GetListRequestAction {
    type: ActionTypes.GET_LIST_REQUEST_ACTION;
    name: string;
    link: Link;
}

export const getListRequestAction = (name: string, link: Link): GetListRequestAction => ({
    type: ActionTypes.GET_LIST_REQUEST_ACTION,
    name,
    link,
});

export interface GetListOptionsRequestAction {
    type: ActionTypes.GET_LIST_OPTIONS_REQUEST_ACTION;
    link: Link;
}

export const getListOptionsRequestAction = (link: Link): GetListOptionsRequestAction => ({
    type: ActionTypes.GET_LIST_OPTIONS_REQUEST_ACTION,
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
    listLink: Link;
}

export const storeListAction = (list: List, link: Link): StoreListAction => ({
    type: ActionTypes.STORE_LIST_ACTION,
    list,
    listLink: link,
});

export interface StoreListOptionsAction {
    type: ActionTypes.STORE_LIST_OPTIONS_ACTION;
    lists: ListOption[];
}

export const storeListOptionsAction = (lists: ListOption[]): StoreListOptionsAction => ({
    type: ActionTypes.STORE_LIST_OPTIONS_ACTION,
    lists,
});

export interface StoreCompletedListAction {
    type: ActionTypes.STORE_COMPLETED_LIST_ACTION;
    list: CompletedList;
}

export const storeCompletedListAction = (list: CompletedList): StoreCompletedListAction => ({
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
