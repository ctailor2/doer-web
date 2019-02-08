import {list} from '../listReducer';
import {ActionTypes} from '../../constants/actionTypes';

describe('list', () => {
	it('has initial state', () => {
		expect(list()).toEqual({});
	});

    it('stores the links from a STORE_LIST_ACTION when received', () => {
        let action = {
            type: ActionTypes.STORE_LIST_ACTION,
            list: {someProperty: 'someValue'}
        }
        let todosState = list({}, action);
        expect(todosState.someProperty).toEqual('someValue');
    });
});
