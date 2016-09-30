jest.unmock('../rootReducer');

import {getReducers} from '../rootReducer';
import {todos} from '../todoReducer';

describe('getReducers', () => {
    it('gets all reducers', () => {
        expect(getReducers()).toEqual({
            todos
        });
    });
});