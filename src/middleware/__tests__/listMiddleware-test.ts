import MockAdapter from "axios-mock-adapter";
import { applyMiddleware, createStore } from "redux";
import { ApplicationAction } from "../../actions/actions";
import { ActionTypes } from "../../constants/actionTypes";
import { ApplicationStore, reducer } from "../../store";
import actionCapturingMiddleware from "../../utils/actionCapturingMiddleware";
import { client } from "../apiClient";
import listMiddleware from "../listMiddleware";

export default undefined;

describe('list middleware', () => {
    const mockAdapter = new MockAdapter(client);
    let capturedActions: ApplicationAction[];
    let store: ApplicationStore;

    beforeEach(() => {
        capturedActions = [];
        store = createStore(
            reducer,
            applyMiddleware(listMiddleware, actionCapturingMiddleware(capturedActions)),
        );
        mockAdapter.reset();
    });

    it('gets list and stores it', (done) => {
        const link = { href: 'listHref' };
        const list = {
            profileName: 'someListName',
            name: 'someName',
            deferredName: 'someDeferredName',
            todos: [],
            deferredTodos: [],
            unlockDuration: 0,
            _links: {
                createDeferred: {
                    href: 'createDeferredHref',
                },
            },
        };
        mockAdapter.onGet(link.href)
            .reply(200, {
                list,
            });

        store.dispatch({
            type: ActionTypes.GET_LIST_REQUEST_ACTION,
            link,
        });

        setTimeout(() => {
            expect(capturedActions).toContainEqual({
                type: ActionTypes.STORE_LIST_ACTION,
                list,
            });
            done();
        });
    });

    it('gets completed list and stores it', (done) => {
        const link = { href: 'completedListHref' };
        const completedList = {
            todos: [
                {
                    task: 'someTask',
                    completedAt: '2018-12-27T04:12:37+0000',
                },
            ],
        };
        mockAdapter.onGet(link.href)
            .reply(200, {
                list: completedList,
            });

        store.dispatch({
            type: ActionTypes.GET_COMPLETED_LIST_REQUEST_ACTION,
            link,
        });

        setTimeout(() => {
            expect(capturedActions).toContainEqual({
                type: ActionTypes.STORE_COMPLETED_LIST_ACTION,
                list: completedList,
            });
            done();
        });
    });

    it('gets list after unlocking it', (done) => {
        const unlockLink = { href: 'unlockHref' };
        const listLink = { href: 'listHref' };
        mockAdapter.onPost(unlockLink.href)
            .reply(202, {
                _links: {
                    list: listLink,
                },
            });

        store.dispatch({
            type: ActionTypes.UNLOCK_LIST_REQUEST_ACTION,
            link: unlockLink,
        });

        setTimeout(() => {
            expect(capturedActions).toContainEqual({
                type: ActionTypes.GET_LIST_REQUEST_ACTION,
                link: listLink,
            });
            done();
        });
    });

    it('gets list options and stores them', (done) => {
        const link = { href: 'listsHref' };
        const listOptions = [{ name: 'someListName' }];
        mockAdapter.onGet(link.href)
            .reply(200, {
                lists: listOptions,
            });

        store.dispatch({
            type: ActionTypes.GET_LIST_OPTIONS_REQUEST_ACTION,
            link,
        });

        setTimeout(() => {
            expect(capturedActions).toContainEqual({
                type: ActionTypes.STORE_LIST_OPTIONS_ACTION,
                lists: listOptions,
            });
            done();
        });
    });

    it('creates the list then gets the new list options', (done) => {
        const createListLink = { href: 'createListHref' };
        const listForm = { name: 'someName' };
        const listsLink = { href: 'listsHref' };
        mockAdapter.onPost(createListLink.href).reply(201, {
            _links: {lists: listsLink},
        });
        store.dispatch({
            type: ActionTypes.CREATE_LIST_ACTION,
            link: createListLink,
            list: listForm,
        });

        setTimeout(() => {
            expect(capturedActions).toContainEqual({
                type: ActionTypes.GET_LIST_OPTIONS_REQUEST_ACTION,
                link: listsLink,
            });
            done();
        });
    });
});
