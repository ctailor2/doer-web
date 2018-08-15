import {combineReducers} from 'redux';
import {links} from './linksReducer';
import {list} from './listReducer';
import {completedList} from './completedListReducer';
import {errors} from './errorsReducer';

const rootReducer = combineReducers(getReducers());

export function getReducers() {
    return {
        links,
        list,
        completedList,
        errors
    };
}

export default rootReducer