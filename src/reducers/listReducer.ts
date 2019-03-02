import _ from 'lodash';
import { ApplicationAction } from '../actions/actions';
import { List } from '../api/list';
import { ActionTypes } from '../constants/actionTypes';

export const defaultState = {
    name: 'now',
    deferredName: 'later',
    todos: [],
    deferredTodos: [],
    unlockDuration: 0,
    _links: {},
} as List;

export function list(state: List = defaultState, action: ApplicationAction) {
    let newState = _.clone(state);
    switch (action.type) {
        case ActionTypes.STORE_LIST_ACTION:
            newState = action.list;
            break;
        default:
            break;
    }
    return newState;
}
