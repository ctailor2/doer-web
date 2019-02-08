import {loadTodosView, watchLoadTodosView, loadHistoryView, watchLoadHistoryView} from '../loadViewSaga';
import {takeLatest} from 'redux-saga';
import {fetchData} from '../sagaHelper'
import {call, put} from 'redux-saga/effects';
import {ActionTypes} from '../../constants/actionTypes'

describe('loadTodosView', () => {
	let iterator, url;
	let action = {
		type: 'LOAD_TODOS_VIEW_ACTION'
	};

    beforeEach(() => {
        url = 'http://some.api/endpoint';
        localStorage.setItem('link', url);
        localStorage.setItem('sessionToken', 'socooltoken');
        iterator = loadTodosView(action);
    });

    it('calls endpoint with link from localStorage', () => {
        expect(iterator.next().value).toEqual(call(fetchData, url, {headers: {'Session-Token': 'socooltoken'}}));
    });

    describe('on request success', () => {
        let resourcesUrl = 'http://some.api/todoResources';
        let links = {todoResources: {href: resourcesUrl}};
        let rootResourcesResponse = {response: {data: {_links: links}}};

        beforeEach(() => {
	        iterator.next();
        });

        it('calls todo resources endpoint', () => {
            expect(iterator.next(rootResourcesResponse).value).toEqual(call(fetchData, resourcesUrl, {headers: {'Session-Token': 'socooltoken'}}));
        });

        describe('on request success', () => {
            let listLink = {href: 'http://some.api/list'};
            let links = {list: listLink};
            let todoResourcesResponse = {response: {data: {_links: links}}};

            beforeEach(() => {
                iterator.next(rootResourcesResponse);
            });

            it('fires store links action', () => {
                expect(iterator.next(todoResourcesResponse).value).toEqual(put({type: ActionTypes.STORE_LINKS_ACTION, links: links}));
            });

            it('fires get list request action with list link', () => {
                iterator.next(todoResourcesResponse);
                expect(iterator.next(todoResourcesResponse).value).toEqual(put({type: 'GET_LIST_REQUEST_ACTION', link: listLink}));
            });
        });
    });
});

describe('watchLoadTodosView', () => {
    let iterator = watchLoadTodosView();

    it('calls load todos view saga with latest load todos view action', () => {
        expect(iterator.next().value).toEqual(takeLatest('LOAD_TODOS_VIEW_ACTION', loadTodosView).next().value);
    });
});

describe('loadHistoryView', () => {
	let iterator, url;
	let action = {
		type: 'LOAD_HISTORY_VIEW_ACTION'
	};

    beforeEach(() => {
        url = 'http://some.api/endpoint';
        localStorage.setItem('link', url);
        localStorage.setItem('sessionToken', 'socooltoken');
        iterator = loadHistoryView(action);
    });

    it('calls endpoint with link from localStorage', () => {
        expect(iterator.next().value).toEqual(call(fetchData, url, {headers: {'Session-Token': 'socooltoken'}}));
    });

    describe('on request success', () => {
        let resourcesUrl = 'http://some.api/historyResources';
        let links = {historyResources: {href: resourcesUrl}};
        let rootResourcesResponse = {response: {data: {_links: links}}};

        beforeEach(() => {
	        iterator.next();
        });

	    it('calls history resources endpoint', () => {
            expect(iterator.next(rootResourcesResponse).value).toEqual(call(fetchData, resourcesUrl, {headers: {'Session-Token': 'socooltoken'}}));
        });

        describe('on request success', () => {
            let completedListLink = {href: 'http://some.api/completedList'};
            let links = {completedList: completedListLink};
            let historyResourcesResponse = {response: {data: {_links: links}}};

            beforeEach(() => {
                iterator.next(rootResourcesResponse);
            });

            it('fires store links action', () => {
                expect(iterator.next(historyResourcesResponse).value).toEqual(put({type: ActionTypes.STORE_LINKS_ACTION, links: links}));
            });

            it('fires get completed list request action', () => {
                iterator.next(historyResourcesResponse);
                expect(iterator.next(historyResourcesResponse).value).toEqual(put({type: 'GET_COMPLETED_LIST_REQUEST_ACTION', link: completedListLink}));
            });
        });
    });
});

describe('watchLoadHistoryView', () => {
    let iterator = watchLoadHistoryView();

    it('calls load history view saga with latest load history view action', () => {
        expect(iterator.next().value).toEqual(takeLatest('LOAD_HISTORY_VIEW_ACTION', loadHistoryView).next().value);
    });
});