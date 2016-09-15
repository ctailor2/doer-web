jest.unmock('../rootReducer');

import {getReducers} from '../rootReducer';

describe('getReducers', () => {
    it('gets all reducers', () => {
        expect(getReducers()).toEqual({
        });
    });
});