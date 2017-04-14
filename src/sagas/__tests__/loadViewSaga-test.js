jest.unmock('../loadViewSaga');
jest.unmock('../../actions/loadViewActions');
jest.unmock('../../actions/todoActions');
jest.unmock('../../actions/linkActions');

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
        let links = {todos: {href: 'http://some.api/todos'}};
        let response = {response: {data: {_links: links}}};

        beforeEach(() => {
	        iterator.next();
        });

        it('fires store links action with links from response', () => {
	        expect(iterator.next(response).value).toEqual(put({type: 'STORE_LINKS_ACTION', links: links}));
        });

	    it('fires get todos request action with link from response', () => {
	        iterator.next(response);
	        expect(iterator.next(response).value).toEqual(put({type: 'GET_TODOS_REQUEST_ACTION', link: links.todos}));
	    });

	    it('fires load todos view complete action on request success', () => {
	        iterator.next(response);
	        iterator.next(response);
	        expect(iterator.next(response).value).toEqual(put({type: 'LOAD_TODOS_VIEW_COMPLETE_ACTION'}));
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
        let links = {completedTodos: {href: 'http://some.api/todos'}};
        let response = {response: {data: {_links: links}}};

        beforeEach(() => {
	        iterator.next();
        });

	    it('fires get completed todos request action with link from response', () => {
	        expect(iterator.next(response).value).toEqual(put({type: 'GET_COMPLETED_TODOS_REQUEST_ACTION', link: links.completedTodos}));
	    });

	    it('fires load history view complete action on request success', () => {
	        iterator.next(response);
	        expect(iterator.next(response).value).toEqual(put({type: 'LOAD_HISTORY_VIEW_COMPLETE_ACTION'}));
	    });
    });

});

describe('watchLoadHistoryView', () => {
    let iterator = watchLoadHistoryView();

    it('calls load history view saga with latest load history view action', () => {
        expect(iterator.next().value).toEqual(takeLatest('LOAD_HISTORY_VIEW_ACTION', loadHistoryView).next().value);
    });
});