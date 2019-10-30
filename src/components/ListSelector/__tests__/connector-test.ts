import { createStore } from "redux";
import { ActionTypes } from "../../../constants/actionTypes";
import { ApplicationStore, reducer } from "../../../store";
import { mapDispatchToProps, mapStateToProps } from "../connector";

export default undefined;

describe('ListSelector connector', () => {
    let store: ApplicationStore;

    beforeEach(() => {
        store = createStore(reducer);
    });

    it('mapsStateToProps', () => {
        const createListLink = { href: 'someHref' };
        store.dispatch({
            type: ActionTypes.STORE_LINKS_ACTION,
            links: { createList: createListLink },
        });
        const lists = [{ name: 'someName' }];
        store.dispatch({
            type: ActionTypes.STORE_LIST_OPTIONS_ACTION,
            lists,
        });
        const list = {
            profileName: 'someListName',
            name: 'someName',
            deferredName: 'someDeferredName',
            todos: [],
            deferredTodos: [],
            unlockDuration: 0,
            _links: {
                createDeferred: { href: 'createdDeferredLink' },
            },
        };

        const props = mapStateToProps(store.getState(), { selectedList: list });
        expect(props.createListLink).toEqual(createListLink);
        expect(props.selectedList).toEqual(list);
        expect(props.listOptions).toEqual(lists);
    });

    it('mapsDispatchToProps', () => {
        const dispatch = jest.spyOn(store, 'dispatch');
        const props = mapDispatchToProps(store.dispatch);
        const link = { href: 'someLink' };
        const list = { name: 'someName' };
        props.createListAction(link, list);

        expect(dispatch).toHaveBeenCalledWith({
            type: ActionTypes.CREATE_LIST_ACTION,
            link,
            list,
        });
    });
});
