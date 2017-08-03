jest.unmock('../rootReducer');

import {getReducers} from '../rootReducer';
import {todos} from '../todoReducer';
import {links} from '../linksReducer';
import {loadView} from '../loadViewReducer';
import {list} from '../listReducer';

describe('getReducers', () => {
    it('gets all reducers', () => {
        expect(getReducers()).toEqual({
            todos,
            links,
            loadView,
            list
        });
    });
});