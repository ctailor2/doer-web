jest.unmock('../sessionActions');

import {signupRequestAction} from '../sessionActions';

describe('signupRequestAction', () => {
    it('creates a signup request action with empty data by default', () => {
        expect(signupRequestAction()).toEqual({
            type: 'SIGNUP_REQUEST_ACTION',
            data: {}
        });
    });

    it('creates a signup request action with supplied data', () => {
        let data = {cool: 'beans'};
        expect(signupRequestAction(data)).toEqual({
            type: 'SIGNUP_REQUEST_ACTION',
            data: data
        });
    });
});