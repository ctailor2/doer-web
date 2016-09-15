jest.unmock('../rootReducer');

import {getReducers} from '../rootReducer';
import {session} from '../sessionReducer';

describe('getReducers', () => {
    it('gets all reducers', () => {
        expect(getReducers()).toEqual({
            session
        });
    });
});