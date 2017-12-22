import {combineReducers} from 'redux';
import {todos} from './todoReducer';
import {links} from './linksReducer';
import {list} from './listReducer';
import {errors} from './errorsReducer';

const rootReducer = combineReducers(getReducers());

export function getReducers() {
    return {
        todos,
        links,
        list,
        errors
    };
}

export default rootReducer