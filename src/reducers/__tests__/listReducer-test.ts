import { ApplicationAction } from '../../actions/actions';
import { ListAndLink } from '../../api/list';
import { ActionTypes } from '../../constants/actionTypes';
import { defaultState, list } from '../listReducer';
import { GetListRequestAction, StoreListAction } from '../../actions/listActions';

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
                completed: { href: '' },
            },
        };
        const listLink = { href: 'someLink' };
        const action = {
            type: ActionTypes.STORE_LIST_ACTION,
            list: myList,
            listLink,
        } as ApplicationAction;
        const todosState = list(defaultState, action);
        expect(todosState.listAndLink!.list).toEqual(myList);
        expect(todosState.listAndLink!.listLink).toEqual(listLink);
    });

    it('clears the list and stores the selected list when a GET_LIST_REQUEST_ACTION is received', () => {
        const myList = {
            profileName: 'someProfileName',
            name: 'someName',
            deferredName: 'someDeferredName',
            todos: [],
            deferredTodos: [],
            unlockDuration: 0,
            _links: {
                createDeferred: { href: '' },
                completed: { href: '' },
            },
        };
        const storeListAction: StoreListAction = {
            type: ActionTypes.STORE_LIST_ACTION,
            list: myList,
            listLink: { href: 'someLink' },
        };
        const getListRequestAction: GetListRequestAction = {
            type: ActionTypes.GET_LIST_REQUEST_ACTION,
            name: 'someName',
            link: { href: 'someHref' },
        };
        const state = list(list(defaultState, storeListAction), getListRequestAction);
        expect(state).toEqual({ listAndLink: null, selectedList: 'someName' });
    });
});
