import _ from 'lodash';
import { ApplicationAction } from '../actions/actions';
import { ListAndLink } from '../api/list';
import { ActionTypes } from '../constants/actionTypes';

export const defaultState = null;

export function list(state: ListAndLink | null = defaultState, action: ApplicationAction) {
    let newState = _.clone(state);
    switch (action.type) {
        case ActionTypes.STORE_LIST_ACTION:
            newState = {
                list: action.list,
                listLink: action.listLink,
            };
            break;
        default:
            break;
    }
    return newState;
}
