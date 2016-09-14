jest.unmock('../sessionReducer');

import {session} from '../sessionReducer';

describe('session', () => {
    let initialState = {};

    it('reduces SIGNUP_RESPONSE_ACTION', () => {
        let action = {
            type: 'SIGNUP_RESPONSE_ACTION',
            data: {some: 'data'}
        };
        expect(session(initialState, action)).toEqual({some: 'data'});
    });
});