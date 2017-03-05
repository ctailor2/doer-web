import {combineReducers} from 'redux';
import {todos} from './todoReducer';
import {links} from './linksReducer';
import {loadView} from './loadViewReducer';

const rootReducer = combineReducers(getReducers());

export function getReducers() {
    return {
        todos,
        links,
        loadView
    };
}

export default rootReducer