export default undefined;
import MockAdapter from "axios-mock-adapter";
import { applyMiddleware, createStore } from "redux";
import { ApplicationAction } from "../../actions/actions";
import { ActionTypes } from "../../constants/actionTypes";
import { ApplicationStore, reducer } from "../../store";
import actionCapturingMiddleware from "../../utils/actionCapturingMiddleware";
import { client } from "../apiClient";
import loadViewMiddleware from "../loadViewMiddleware";

describe('load view middleware', () => {
    const mockAdapter = new MockAdapter(client);
    let capturedActions: ApplicationAction[];
    let store: ApplicationStore;

    beforeEach(() => {
        capturedActions = [];
        store = createStore(
            reducer,
            applyMiddleware(loadViewMiddleware, actionCapturingMiddleware(capturedActions)),
        );
        mockAdapter.reset();
        localStorage.setItem('link', 'rootHref');
    });

    describe('loading todos view', () => {
        const links = {
            list: {
                href: 'listHref',
            },
            lists: {
                href: 'listsHref',
            },
        };

        beforeEach(() => {
            mockAdapter.onGet('rootHref')
                .reply(200, {
                    _links: {
                        listResources: {
                            href: 'listResourcesHref',
                        },
                        historyResources: {
                            href: 'historyResourcesHref',
                        },
                    },
                });
            mockAdapter.onGet('listResourcesHref')
                .reply(200, {
                    _links: links,
                });
            store.dispatch({
                type: ActionTypes.LOAD_TODOS_VIEW_ACTION,
            });
        });

        it('stores the todo resources links', (done) => {
            setTimeout(() => {
                expect(capturedActions).toContainEqual({
                    type: ActionTypes.STORE_LINKS_ACTION,
                    links,
                });
                done();
            });
        });

        it('gets the list options', (done) => {
            setTimeout(() => {
                expect(capturedActions).toContainEqual({
                    type: ActionTypes.GET_LIST_OPTIONS_REQUEST_ACTION,
                    link: links.lists,
                });
                done();
            });
        });

        it('gets the list', (done) => {
            setTimeout(() => {
                expect(capturedActions).toContainEqual({
                    type: ActionTypes.GET_LIST_REQUEST_ACTION,
                    link: links.list,
                });
                done();
            });
        });
    });

    describe('history view', () => {
        const links = {
            completedList: {
                href: 'completedListHref',
            },
        };

        beforeEach(() => {
            mockAdapter.onGet('rootHref')
                .reply(200, {
                    _links: {
                        listResources: {
                            href: 'listResourcesHref',
                        },
                        historyResources: {
                            href: 'historyResourcesHref',
                        },
                    },
                });
            mockAdapter.onGet('historyResourcesHref')
                .reply(200, {
                    _links: links,
                });
            store.dispatch({
                type: ActionTypes.LOAD_HISTORY_VIEW_ACTION,
            });
        });

        it('stores the history resources links', (done) => {
            setTimeout(() => {
                expect(capturedActions).toContainEqual({
                    type: ActionTypes.STORE_LINKS_ACTION,
                    links,
                });
                done();
            });
        });

        it('gets the completed list', (done) => {
            setTimeout(() => {
                expect(capturedActions).toContainEqual({
                    type: ActionTypes.GET_COMPLETED_LIST_REQUEST_ACTION,
                    link: links.completedList,
                });
                done();
            });
        });
    });
});
