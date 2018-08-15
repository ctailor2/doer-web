import {getReducers} from '../rootReducer';
import {links} from '../linksReducer';
import {list} from '../listReducer';
import {completedList} from '../completedListReducer';
import {errors} from '../errorsReducer';

describe('getReducers', () => {
    it('gets all reducers', () => {
        expect(getReducers()).toEqual({
            links,
            list,
            completedList,
            errors
        });
    });
});