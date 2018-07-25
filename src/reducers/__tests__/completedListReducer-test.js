import {completedList} from '../completedListReducer';

describe('completedList', () => {
	it('has initial state', () => {
		expect(completedList()).toEqual({});
	});

    it('stores the links from a STORE_COMPLETED_LIST_ACTION when received', () => {
        let action = {
            type: 'STORE_COMPLETED_LIST_ACTION',
            list: {someProperty: 'someValue'}
        }
        let state = completedList({}, action);
        expect(state.someProperty).toEqual('someValue');
    });
});
