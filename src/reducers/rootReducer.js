import {combineReducers} from 'redux';
import {session} from './sessionReducer';

const rootReducer = combineReducers(getReducers());

export function getReducers() {
    return {
        session
    };
}

export default rootReducer