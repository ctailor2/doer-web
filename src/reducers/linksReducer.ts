import _ from 'lodash';
import { ApplicationAction } from '../actions/actions';
import { Link } from '../api/api';
import { ActionTypes } from '../constants/actionTypes';

const defaultState = {};

export function links(state: { [name: string]: Link | undefined } = defaultState, action: ApplicationAction) {
    let newState = _.clone(state);
    switch (action.type) {
        case ActionTypes.STORE_LINKS_ACTION:
            newState = action.links;
            break;
        default:
            break;
    }
    return newState;
}
