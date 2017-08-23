import {list} from '../listReducer';

describe('list', () => {
	it('has initial state', () => {
		expect(list()).toEqual({});
	});

    it('stores the links from a STORE_LIST_ACTION when received', () => {
        let action = {
            type: 'STORE_LIST_ACTION',
            list: {someProperty: 'someValue'}
        }
        let todosState = list({}, action);
        expect(todosState.someProperty).toEqual('someValue');
    });
});
