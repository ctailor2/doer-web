import {takeEvery} from 'redux-saga';
import {call, put} from 'redux-saga/effects';
import {
	watchCreateTodoRequest,
	watchDeleteTodoRequest,
	watchDisplaceTodoRequest,
	watchUpdateTodoRequest,
	watchCompleteTodoRequest,
	watchMoveTodoRequest,
	watchPullTodosRequest,
	deleteTodoRequest,
	postRequestWithNoData,
	postRequestWithTodoData,
	putRequestWithTodoData
} from '../todoSaga';
import {fetchData, postData, deleteData, putData} from '../sagaHelper'

describe('deleteTodoRequest', () => {
	let link = {href: 'http://some.api/todo'};
	let action = {type: 'DELETE_TODO_REQUEST_ACTION', link: link};
	let iterator;

	beforeEach(() => {
        localStorage.setItem('sessionToken', 'socooltoken');
		iterator = deleteTodoRequest(action);
	});

	it('calls endpoint with action link href', () => {
		expect(iterator.next().value).toEqual(call(deleteData, link.href, {headers: {'Session-Token': 'socooltoken'}}));
	});

    describe('on request success', () => {
        let listLink = {href: 'http://some.api/list'};
        let response = {response: {data: {
            _links: {
                list: listLink
            }
        }}};

        beforeEach(() => {
            iterator.next();
        });

        it('fires get list request action with list link', () => {
            expect(iterator.next(response).value).toEqual(put({type: 'GET_LIST_REQUEST_ACTION', link: listLink}));
        });
    });
});

describe('postRequestWithTodoData', () => {
	let todo = {task: 'task'};
	let link = {href: 'http://some.api/todo'};
	let action = {type: 'CREATE_TODO_REQUEST_ACTION', link: link, todo: todo};
	let iterator;

	beforeEach(() => {
        localStorage.setItem('sessionToken', 'socooltoken');
		iterator = postRequestWithTodoData(action);
	});

    it('fires clear errors action', () => {
        expect(iterator.next().value)
            .toEqual(put({type: 'CLEAR_ERRORS_ACTION'}));
    });

	it('calls endpoint with action link href and todo', () => {
        iterator.next();
		expect(iterator.next().value).toEqual(call(postData, link.href, todo, {headers: {'Session-Token': 'socooltoken'}}));
	});

    describe('on request success', () => {
        let listLink = {href: 'http://some.api/list'};
        let response = {response: {data: {
            _links: {
                list: listLink
            }
        }}};

        beforeEach(() => {
            iterator.next();
            iterator.next();
        });

        it('fires get list request action with list link', () => {
            expect(iterator.next(response).value).toEqual(put({type: 'GET_LIST_REQUEST_ACTION', link: listLink}));
        });
    });

    describe('on request failure', () => {
        let errors = {
            fieldErrors: [],
            globalErrors: []
        };
        let response = {error: {response: {data: errors}}};

        beforeEach(() => {
            iterator.next();
            iterator.next();
        });

        it('fires store errors action', () => {
            expect(iterator.next(response).value).toEqual(put({type: 'STORE_ERRORS_ACTION', errors: errors}));
        });
    });
});

describe('putRequestWithTodoData', () => {
	let todo = {task: 'task'};
	let link = {href: 'http://some.api/todo'};
	let action = {type: 'UPDATE_TODO_REQUEST_ACTION', link: link, todo: todo};
	let iterator;

	beforeEach(() => {
        localStorage.setItem('sessionToken', 'socooltoken');
		iterator = putRequestWithTodoData(action);
	});

    it('fires clear errors action', () => {
        expect(iterator.next().value)
            .toEqual(put({type: 'CLEAR_ERRORS_ACTION'}));
    });

	it('calls endpoint with action link href and todo', () => {
        iterator.next();
		expect(iterator.next().value).toEqual(call(putData, link.href, todo, {headers: {'Session-Token': 'socooltoken'}}));
	});

    describe('on request success', () => {
        let listLink = {href: 'http://some.api/list'};
        let response = {response: {data: {
            _links: {
                list: listLink
            }
        }}};

        beforeEach(() => {
            iterator.next();
            iterator.next();
        });

        it('fires get list request action with list link', () => {
            expect(iterator.next(response).value).toEqual(put({type: 'GET_LIST_REQUEST_ACTION', link: listLink}));
        });
    });

    describe('on request failure', () => {
        let errors = {
            fieldErrors: [],
            globalErrors: []
        };
        let response = {error: {response: {data: errors}}};

        beforeEach(() => {
            iterator.next();
            iterator.next();
        });

        it('fires store errors action', () => {
            expect(iterator.next(response).value).toEqual(put({type: 'STORE_ERRORS_ACTION', errors: errors}));
        });
    });
});

describe('postRequestWithNoData', () => {
	let link = {href: 'http://some.api/todo'};
	let action = {type: 'PULL_TODOS_REQUEST_ACTION', link: link};
	let iterator;

	beforeEach(() => {
        localStorage.setItem('sessionToken', 'socooltoken');
		iterator = postRequestWithNoData(action);
	});

	it('calls endpoint with action link href', () => {
		expect(iterator.next().value).toEqual(call(postData, link.href, null, {headers: {'Session-Token': 'socooltoken'}}));
	});

    describe('on request success', () => {
        let listLink = {href: 'http://some.api/list'};
        let response = {response: {data: {
            _links: {
                list: listLink
            }
        }}};

        beforeEach(() => {
            iterator.next();
        });

        it('fires get list request action with list link', () => {
            expect(iterator.next(response).value).toEqual(put({type: 'GET_LIST_REQUEST_ACTION', link: listLink}));
        });
    });
});

describe('watchDeleteTodoRequest', () => {
	let iterator = watchDeleteTodoRequest();

	it('calls delete todo request saga with every delete todo request action', () => {
		expect(iterator.next().value).toEqual(takeEvery('DELETE_TODO_REQUEST_ACTION', deleteTodoRequest).next().value);
	});
});

describe('watchCreateTodoRequest', () => {
	let iterator = watchCreateTodoRequest();

	it('calls create todo request saga with every create todo request action', () => {
		expect(iterator.next().value).toEqual(takeEvery('CREATE_TODO_REQUEST_ACTION', postRequestWithTodoData).next().value);
	});
});

describe('watchDisplaceTodoRequest', () => {
	let iterator = watchDisplaceTodoRequest();

	it('calls displace todo request saga with every displace todo request action', () => {
		expect(iterator.next().value).toEqual(takeEvery('DISPLACE_TODO_REQUEST_ACTION', postRequestWithTodoData).next().value);
	});
});

describe('watchUpdateTodoRequest', () => {
	let iterator = watchUpdateTodoRequest();

	it('calls update todo request saga with every update todo request action', () => {
		expect(iterator.next().value).toEqual(takeEvery('UPDATE_TODO_REQUEST_ACTION', putRequestWithTodoData).next().value);
	});
});

describe('watchCompleteTodoRequest', () => {
	let iterator = watchCompleteTodoRequest();

	it('calls post request with no data saga with every complete todo request action', () => {
		expect(iterator.next().value).toEqual(takeEvery('COMPLETE_TODO_REQUEST_ACTION', postRequestWithNoData).next().value);
	});
});

describe('watchMoveTodoRequest', () => {
	let iterator = watchMoveTodoRequest();

	it('calls post request with no data saga with every move todo request action', () => {
		expect(iterator.next().value).toEqual(takeEvery('MOVE_TODO_REQUEST_ACTION', postRequestWithNoData).next().value);
	});
});

describe('watchPullTodoRequest', () => {
	let iterator = watchPullTodosRequest();

	it('calls post request with no data saga with every pull todos request action', () => {
		expect(iterator.next().value).toEqual(takeEvery('PULL_TODOS_REQUEST_ACTION', postRequestWithNoData).next().value);
	});
});