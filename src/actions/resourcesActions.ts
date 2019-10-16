import { Link } from '../api/api';
import { ActionTypes } from '../constants/actionTypes';

export interface GetRootResourcesRequestAction {
    type: ActionTypes.GET_ROOT_RESOURCES_REQUEST_ACTION;
    link: Link;
}

export const getRootResourcesRequestAction = (link: Link): GetRootResourcesRequestAction => ({
    type: ActionTypes.GET_ROOT_RESOURCES_REQUEST_ACTION,
    link,
});

export interface GetBaseResourcesRequestAction {
    type: ActionTypes.GET_BASE_RESOURCES_REQUEST_ACTION;
}

export const getBaseResourcesRequestAction = (): GetBaseResourcesRequestAction => ({
    type: ActionTypes.GET_BASE_RESOURCES_REQUEST_ACTION,
});

export interface GetTodoResourcesRequestAction {
    type: ActionTypes.GET_LIST_RESOURCES_REQUEST_ACTION;
    link: Link;
}

export const getTodoResourcesRequestAction = (link: Link): GetTodoResourcesRequestAction => ({
    type: ActionTypes.GET_LIST_RESOURCES_REQUEST_ACTION,
    link,
});

export interface GetHistoryResourcesRequestAction {
    type: ActionTypes.GET_HISTORY_RESOURCES_REQUEST_ACTION;
    link: Link;
}

export const getHistoryResourcesRequestAction = (link: Link): GetHistoryResourcesRequestAction => ({
    type: ActionTypes.GET_HISTORY_RESOURCES_REQUEST_ACTION,
    link,
});
