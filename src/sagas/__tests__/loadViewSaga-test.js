jest.unmock('../loadViewSaga');
jest.unmock('../../actions/loadViewActions');
jest.unmock('../../actions/linkActions');
jest.unmock('../../actions/todoActions');

import {loadTodosView, watchLoadTodosView, loadHistoryView, watchLoadHistoryView} from '../loadViewSaga';
import {takeLatest} from 'redux-saga';
import {fetchData} from '../sagaHelper'
import {call, put} from 'redux-saga/effects';

describe('loadTodosView', () => {
	let iterator, url;
	let action = {
		type: 'LOAD_TODOS_VIEW_ACTION'
	};

    beforeEach(() => {
        url = 'http://some.api/endpoint';
        localStorage.getItem = jest.fn((key) => {
            switch(key) {
                case 'link':
                    return url;
                case 'sessionToken':
                    return 'socooltoken';
                default:
                    break;
            }
        });
        iterator = loadTodosView(action);
    });

    it('gets link from localStorage', () => {
        iterator.next();
        expect(localStorage.getItem).toBeCalledWith('link');
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
            let todosLink = {href: 'http://some.api/todos'};
            let links = {todos: todosLink};
            let todoResourcesResponse = {response: {data: {_links: links}}};

            beforeEach(() => {
                iterator.next(rootResourcesResponse);
            });

            it('fires store links action', () => {
                expect(iterator.next(todoResourcesResponse).value).toEqual(put({type: 'STORE_LINKS_ACTION', links: links}));
            });

            it('fires get todos request action', () => {
                iterator.next(todoResourcesResponse);
                expect(iterator.next(todoResourcesResponse).value).toEqual(put({type: 'GET_TODOS_REQUEST_ACTION', link: todosLink}));
            });

    	    it('fires load todos view complete action on request success', () => {
                iterator.next(todoResourcesResponse);
                iterator.next(todoResourcesResponse);
    	        expect(iterator.next(todoResourcesResponse).value).toEqual(put({type: 'LOAD_TODOS_VIEW_COMPLETE_ACTION'}));
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
        localStorage.getItem = jest.fn((key) => {
            switch(key) {
                case 'link':
                    return url;
                case 'sessionToken':
                    return 'socooltoken';
                default:
                    break;
            }
        });
        iterator = loadHistoryView(action);
    });

    it('gets link from localStorage', () => {
        iterator.next();
        expect(localStorage.getItem).toBeCalledWith('link');
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

        describe('on request succes', () => {
            let completedTodosLink = {href: 'http://some.api/completedTodos'};
            let links = {completedTodos: completedTodosLink};
            let historyResourcesResponse = {response: {data: {_links: links}}};

            beforeEach(() => {
                iterator.next(rootResourcesResponse);
            });

            it('fires store links action', () => {
                expect(iterator.next(historyResourcesResponse).value).toEqual(put({type: 'STORE_LINKS_ACTION', links: links}));
            });

            it('fires get todos request action', () => {
                iterator.next(historyResourcesResponse);
                expect(iterator.next(historyResourcesResponse).value).toEqual(put({type: 'GET_COMPLETED_TODOS_REQUEST_ACTION', link: completedTodosLink}));
            });

            it('fires load history view complete action on request success', () => {
                iterator.next(historyResourcesResponse);
                iterator.next(historyResourcesResponse);
                expect(iterator.next(historyResourcesResponse).value).toEqual(put({type: 'LOAD_HISTORY_VIEW_COMPLETE_ACTION'}));
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