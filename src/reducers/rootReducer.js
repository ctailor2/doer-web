import {combineReducers} from 'redux';
import {todos} from './todoReducer';
import {links} from './linksReducer';
import {loadView} from './loadViewReducer';
import {list} from './listReducer';

const rootReducer = combineReducers(getReducers());

export function getReducers() {
    return {
        todos,
        links,
        loadView,
        list
    };
}

export default rootReducer