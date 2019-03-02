import {completedList} from './completedListReducer';
import {errors} from './errorsReducer';
import {links} from './linksReducer';
import {list} from './listReducer';

export const reducers = {
    links,
    list,
    completedList,
    errors,
};
