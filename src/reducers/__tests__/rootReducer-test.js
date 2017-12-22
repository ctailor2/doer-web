import {getReducers} from '../rootReducer';
import {todos} from '../todoReducer';
import {links} from '../linksReducer';
import {list} from '../listReducer';
import {errors} from '../errorsReducer';

describe('getReducers', () => {
    it('gets all reducers', () => {
        expect(getReducers()).toEqual({
            todos,
            links,
            list,
            errors
        });
    });
});