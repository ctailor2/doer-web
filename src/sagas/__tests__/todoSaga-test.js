jest.unmock('../todoSaga');
jest.unmock('../sessionSaga');
jest.unmock('../../actions/todoActions');
jest.unmock('../../actions/linkActions');

import {takeEvery} from 'redux-saga';
import {call, put} from 'redux-saga/effects';
import {
	watchGetTodosRequest,
	getTodosRequest,
	watchCreateTodoRequest,
	createTodoRequest,
	watchDeleteTodoRequest,
	deleteTodoRequest,
	watchDisplaceTodoRequest,
	displaceTodoRequest,
	watchUpdateTodoRequest,
	updateTodoRequest,
	watchCompleteTodoRequest,
	completeTodoRequest
} from '../todoSaga';
import {fetchData, postData, deleteData, putData} from '../sagaHelper'

describe('getTodosRequest', () => {
	let iterator;

	let url = 'http://some.api/someLink';
    let action = {
        type: 'GET_TODOS_REQUEST_ACTION',
        link: {href: url}
    };
    let links = [{rel: "this", href: "tisket"}, {rel: "that", href: "tasket"}];

	beforeEach(() => {
        localStorage.getItem = jest.fn(() => {return 'socooltoken'});
		iterator = getTodosRequest(action);
	});

	it('calls endpoint with action href', () => {
        expect(iterator.next().value).toEqual(call(fetchData, url, {headers: {'Session-Token': 'socooltoken'}}));
	});

	it('fires store todos action with anytime scheduling', () => {
        iterator.next();
        expect(iterator.next({response: {data: {todos: [1, 2, 3], _links: links}}}).value)
            .toEqual(put({type: 'STORE_TODOS_ACTION', todos: [1, 2, 3], scheduling: 'anytime'}));
    });

    it('fires store links action', () => {
        iterator.next();
        iterator.next({response: {data: {todos: [1, 2, 3], _links: links}}});
        expect(iterator.next({response: {data: {_links: links}}}).value)
            .toEqual(put({type: 'STORE_LINKS_ACTION', links: links}));
    });
});

describe('createTodoRequest', () => {
	let todo = {task: 'task', scheduling: 'now'};
	let link = {href: 'http://some.api/todo'};
	let action = {type: 'CREATE_TODO_REQUEST_ACTION', link: link, todo: todo};
	let iterator;

	beforeEach(() => {
		iterator = createTodoRequest(action);
	});

	it('calls endpoint with action link href and todo', () => {
		expect(iterator.next().value).toEqual(call(postData, link.href, todo, {headers: {'Session-Token': 'socooltoken'}}));
	});

    it('fires get todos action on success', () => {
        let todosLink = {href: 'http://some.api/todos'};
        let response = {response: {data: {
            _links: {
                todos: todosLink
            }
        }}};
        iterator.next();
        expect(iterator.next(response).value).toEqual(put({type: 'GET_TODOS_REQUEST_ACTION', link: todosLink}));
    });
});

describe('deleteTodoRequest', () => {
	let link = {href: 'http://some.api/todo'};
	let action = {type: 'DELETE_TODO_REQUEST_ACTION', link: link};
	let iterator;

	beforeEach(() => {
		iterator = deleteTodoRequest(action);
	});

	it('calls endpoint with action link href', () => {
		expect(iterator.next().value).toEqual(call(deleteData, link.href, {headers: {'Session-Token': 'socooltoken'}}));
	});

    it('fires get todos action on success', () => {
        let todosLink = {href: 'http://some.api/todos'};
        let response = {response: {data: {
            _links: {
                todos: todosLink
            }
        }}};
        iterator.next();
        expect(iterator.next(response).value).toEqual(put({type: 'GET_TODOS_REQUEST_ACTION', link: todosLink}));
    });
});

describe('displaceTodoRequest', () => {
	let todo = {task: 'task', scheduling: 'now'};
	let link = {href: 'http://some.api/todo'};
	let action = {type: 'DISPLACE_TODO_REQUEST_ACTION', link: link, todo: todo};
	let iterator;

	beforeEach(() => {
		iterator = displaceTodoRequest(action);
	});

	it('calls endpoint with action link href', () => {
		expect(iterator.next().value).toEqual(call(postData, link.href, todo, {headers: {'Session-Token': 'socooltoken'}}));
	});

    it('fires get todos action on success', () => {
        let todosLink = {href: 'http://some.api/todos'};
        let response = {response: {data: {
            _links: {
                todos: todosLink
            }
        }}};
        iterator.next();
        expect(iterator.next(response).value).toEqual(put({type: 'GET_TODOS_REQUEST_ACTION', link: todosLink}));
    });
});

describe('updateTodoRequest', () => {
	let todo = {task: 'task'};
	let link = {href: 'http://some.api/todo'};
	let action = {type: 'UPDATE_TODO_REQUEST_ACTION', link: link, todo: todo};
	let iterator;

	beforeEach(() => {
		iterator = updateTodoRequest(action);
	});

	it('calls endpoint with action link href and todo', () => {
		expect(iterator.next().value).toEqual(call(putData, link.href, todo, {headers: {'Session-Token': 'socooltoken'}}));
	});

    it('fires get todos action on success', () => {
        let todosLink = {href: 'http://some.api/todos'};
        let response = {response: {data: {
            _links: {
                todos: todosLink
            }
        }}};
        iterator.next();
        expect(iterator.next(response).value).toEqual(put({type: 'GET_TODOS_REQUEST_ACTION', link: todosLink}));
    });
});

describe('completeTodoRequest', () => {
	let link = {href: 'http://some.api/todo'};
	let action = {type: 'COMPLETE_TODO_REQUEST_ACTION', link: link};
	let iterator;

	beforeEach(() => {
		iterator = completeTodoRequest(action);
	});

	it('calls endpoint with action link href', () => {
		expect(iterator.next().value).toEqual(call(postData, link.href, null, {headers: {'Session-Token': 'socooltoken'}}));
	});

    it('fires get todos action on success', () => {
        let todosLink = {href: 'http://some.api/todos'};
        let response = {response: {data: {
            _links: {
                todos: todosLink
            }
        }}};
        iterator.next();
        expect(iterator.next(response).value).toEqual(put({type: 'GET_TODOS_REQUEST_ACTION', link: todosLink}));
    });
});

describe('watchGetTodosRequest', () => {
	let iterator = watchGetTodosRequest();

	it('calls get todos request saga with every get todos request action', () => {
		expect(iterator.next().value).toEqual(takeEvery('GET_TODOS_REQUEST_ACTION', getTodosRequest).next().value);
	});
});

describe('watchCreateTodoRequest', () => {
	let iterator = watchCreateTodoRequest();

	it('calls create todo request saga with every create todo request action', () => {
		expect(iterator.next().value).toEqual(takeEvery('CREATE_TODO_REQUEST_ACTION', createTodoRequest).next().value);
	});
});

describe('watchDeleteTodoRequest', () => {
	let iterator = watchDeleteTodoRequest();

	it('calls delete todo request saga with every delete todo request action', () => {
		expect(iterator.next().value).toEqual(takeEvery('DELETE_TODO_REQUEST_ACTION', deleteTodoRequest).next().value);
	});
});

describe('watchDisplaceTodoRequest', () => {
	let iterator = watchDisplaceTodoRequest();

	it('calls displace todo request saga with every displace todo request action', () => {
		expect(iterator.next().value).toEqual(takeEvery('DISPLACE_TODO_REQUEST_ACTION', displaceTodoRequest).next().value);
	});
});

describe('watchUpdateTodoRequest', () => {
	let iterator = watchUpdateTodoRequest();

	it('calls update todo request saga with every update todo request action', () => {
		expect(iterator.next().value).toEqual(takeEvery('UPDATE_TODO_REQUEST_ACTION', updateTodoRequest).next().value);
	});
});

describe('watchCompleteTodoRequest', () => {
	let iterator = watchCompleteTodoRequest();

	it('calls complete todo request saga with every complete todo request action', () => {
		expect(iterator.next().value).toEqual(takeEvery('COMPLETE_TODO_REQUEST_ACTION', completeTodoRequest).next().value);
	});
});