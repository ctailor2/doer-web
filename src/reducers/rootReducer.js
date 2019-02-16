import {combineReducers} from 'redux';
import {links} from './linksReducer';
import {list} from './listReducer';
import {completedList} from './completedListReducer';
import {errors} from './errorsReducer';

export const reducers = {
    links,
    list,
    completedList,
    errors,
}
