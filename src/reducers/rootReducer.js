import {combineReducers} from 'redux';
import {todos} from './todoReducer';
import {links} from './linksReducer';
import {list} from './listReducer';

const rootReducer = combineReducers(getReducers());

export function getReducers() {
    return {
        todos,
        links,
        list
    };
}

export default rootReducer