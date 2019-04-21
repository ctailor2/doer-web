import _ from 'lodash';
import { ApplicationAction } from '../actions/actions';
import { CompletedList } from '../api/completedList';
import { ActionTypes } from '../constants/actionTypes';

export const defaultState = null;

export function completedList(state: CompletedList | null = defaultState, action: ApplicationAction) {
    let newState = _.clone(state);
    switch (action.type) {
        case ActionTypes.STORE_COMPLETED_LIST_ACTION:
            newState = action.list;
            break;
        default:
            break;
    }
    return newState;
}
