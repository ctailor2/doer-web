jest.unmock('../apiActions');

import {pingApiAction} from '../apiActions';

describe('pingApiAction', () => {
    it('creates a ping api action', () => {
        expect(pingApiAction()).toEqual({
            type: 'PING_API_ACTION'
        })
    });
});