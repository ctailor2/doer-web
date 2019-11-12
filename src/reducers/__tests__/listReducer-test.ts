import { ApplicationAction } from '../../actions/actions';
import { ListAndLink } from '../../api/list';
import { ActionTypes } from '../../constants/actionTypes';
import { defaultState, list } from '../listReducer';

describe('list', () => {
    it('has initial state', () => {
        expect(list(undefined, { type: ActionTypes.GET_BASE_RESOURCES_REQUEST_ACTION })).toEqual(defaultState);
    });

    it('stores the links from a STORE_LIST_ACTION when received', () => {
        const myList = {
            profileName: 'someProfileName',
            name: 'someName',
            deferredName: 'someDeferredName',
            todos: [],
            deferredTodos: [],
            unlockDuration: 0,
            _links: {
                createDeferred: { href: '' },
            },
        };
        const listLink = { href: 'someLink' };
        const action = {
            type: ActionTypes.STORE_LIST_ACTION,
            list: myList,
            listLink,
        } as ApplicationAction;
        const todosState = list(defaultState, action) as ListAndLink;
        expect(todosState.list).toEqual(myList);
        expect(todosState.listLink).toEqual(listLink);
    });
});
