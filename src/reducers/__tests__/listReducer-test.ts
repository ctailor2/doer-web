import { ApplicationAction } from '../../actions/actions';
import { List } from '../../api/list';
import { ActionTypes } from '../../constants/actionTypes';
import { defaultState, list } from '../listReducer';

describe('list', () => {
    it('has initial state', () => {
        expect(list(undefined, { type: ActionTypes.GET_BASE_RESOURCES_REQUEST_ACTION })).toEqual(defaultState);
    });

    it('stores the links from a STORE_LIST_ACTION when received', () => {
        const action = {
            type: ActionTypes.STORE_LIST_ACTION,
            list: {
                name: 'someName',
                deferredName: 'someDeferredName',
                todos: [],
                deferredTodos: [],
                unlockDuration: 0,
                _links: {
                    createDeferred: {href: ''},
                },
            },
        } as ApplicationAction;
        const todosState = list(defaultState, action) as List;
        expect(todosState.name).toEqual('someName');
        expect(todosState.deferredName).toEqual('someDeferredName');
    });
});
