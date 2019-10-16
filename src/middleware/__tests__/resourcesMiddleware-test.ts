export default undefined;
import MockAdapter from "axios-mock-adapter";
import { applyMiddleware, createStore } from "redux";
import { ApplicationAction } from "../../actions/actions";
import { ActionTypes } from "../../constants/actionTypes";
import { ApplicationStore, reducer } from "../../store";
import actionCapturingMiddleware from "../../utils/actionCapturingMiddleware";
import { client } from "../apiClient";
import resourcesMiddleware, { rootLink } from "../resourcesMiddleware";

describe('resources middleware', () => {
    const mockAdapter = new MockAdapter(client);
    let capturedActions: ApplicationAction[];
    let store: ApplicationStore;

    beforeEach(() => {
        capturedActions = [];
        store = createStore(
            reducer,
            applyMiddleware(resourcesMiddleware, actionCapturingMiddleware(capturedActions)),
        );
        mockAdapter.reset();
    });

    it('stores links from base resources', (done) => {
        const links = {
            login: { href: '123' },
            signup: { href: '123' },
        };
        mockAdapter.onGet(rootLink.href)
            .reply(200, {
                _links: links,
            });

        store.dispatch({
            type: ActionTypes.GET_BASE_RESOURCES_REQUEST_ACTION,
        });

        setTimeout(() => {
            expect(capturedActions).toContainEqual({
                type: ActionTypes.STORE_LINKS_ACTION,
                links,
            });
            done();
        });
    });

    it('stores links from root resources', (done) => {
        const links = {
            listResources: { href: 'listResourcesHref' },
            historyResources: { href: 'historyResourcesHref' },
        };
        const link = { href: 'rootHref' };
        mockAdapter.onGet(link.href)
            .reply(200, {
                _links: links,
            });

        store.dispatch({
            type: ActionTypes.GET_ROOT_RESOURCES_REQUEST_ACTION,
            link,
        });

        setTimeout(() => {
            expect(capturedActions).toContainEqual({
                type: ActionTypes.STORE_LINKS_ACTION,
                links,
            });
            done();
        });
    });

    it('stores links from listResources resources', (done) => {
        const links = {
            list: { href: 'listHref' },
        };
        const link = { href: 'listResourcesHref' };
        mockAdapter.onGet(link.href)
            .reply(200, {
                _links: links,
            });

        store.dispatch({
            type: ActionTypes.GET_LIST_RESOURCES_REQUEST_ACTION,
            link,
        });

        setTimeout(() => {
            expect(capturedActions).toContainEqual({
                type: ActionTypes.STORE_LINKS_ACTION,
                links,
            });
            done();
        });
    });

    it('stores links from historyResources resources', (done) => {
        const links = {
            completedList: { href: 'completedListHref' },
        };
        const link = { href: 'historyResourcesHref' };
        mockAdapter.onGet(link.href)
            .reply(200, {
                _links: links,
            });

        store.dispatch({
            type: ActionTypes.GET_HISTORY_RESOURCES_REQUEST_ACTION,
            link,
        });

        setTimeout(() => {
            expect(capturedActions).toContainEqual({
                type: ActionTypes.STORE_LINKS_ACTION,
                links,
            });
            done();
        });
    });
});
