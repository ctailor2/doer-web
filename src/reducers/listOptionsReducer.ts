import _ from 'lodash';
import { ApplicationAction } from '../actions/actions';
import { ListOption } from '../api/list';
import { ActionTypes } from '../constants/actionTypes';

export const defaultState = [];

export function listOptions(state: ListOption[] = defaultState, action: ApplicationAction) {
    let newState = _.clone(state);
    switch (action.type) {
        case ActionTypes.STORE_LIST_OPTIONS_ACTION:
            newState = action.lists;
            break;
        default:
            break;
    }
    return newState;
}
