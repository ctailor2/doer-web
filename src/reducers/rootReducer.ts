import {completedList} from './completedListReducer';
import {errors} from './errorsReducer';
import {links} from './linksReducer';
import {listOptions} from './listOptionsReducer';
import {list} from './listReducer';

export const reducers = {
    links,
    list,
    listOptions,
    completedList,
    errors,
};
