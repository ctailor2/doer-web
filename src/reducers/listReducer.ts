import _ from 'lodash';
import { ApplicationAction } from '../actions/actions';
import { ListAndLink } from '../api/list';
import { ActionTypes } from '../constants/actionTypes';

export const defaultState = { listAndLink: null, selectedList: null };

interface ListState {
    listAndLink: ListAndLink | null;
    selectedList: string | null;
}

export function list(state: ListState = defaultState, action: ApplicationAction) {
    const newState = _.clone(state);
    switch (action.type) {
        case ActionTypes.STORE_LIST_ACTION:
            newState.listAndLink = {
                list: action.list,
                listLink: action.listLink,
            };
            break;
        case ActionTypes.GET_LIST_REQUEST_ACTION:
            newState.selectedList = action.name;
            break;
        default:
            break;
    }
    return newState;
}
