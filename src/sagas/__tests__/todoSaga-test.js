import {takeEvery} from 'redux-saga';
import {call, put} from 'redux-saga/effects';
import {
	watchGetTodosRequest,
	watchGetDeferredTodosRequest,
	watchGetCompletedTodosRequest,
	watchCreateTodoRequest,
	watchDeleteTodoRequest,
	watchDisplaceTodoRequest,
	watchUpdateTodoRequest,
	watchCompleteTodoRequest,
	watchMoveTodoRequest,
	watchPullTodosRequest,
	getTodosRequest,
	getDeferredTodosRequest,
	getCompletedTodosRequest,
	deleteTodoRequest,
	postRequestWithNoData,
	postRequestWithTodoData,
	putRequestWithTodoData
} from '../todoSaga';
import {fetchData, postData, deleteData, putData} from '../sagaHelper'

describe('getTodosRequest', () => {
	let iterator;

	let url = 'http://some.api/someLink';
    let action = {
        type: 'GET_TODOS_REQUEST_ACTION',
        link: {href: url}
    };
    let links = {
        something: {href: "tisket"},
        somethingElse: {href: "tasket"}
    };

	beforeEach(() => {
        localStorage.getItem = jest.fn(() => {return 'socooltoken'});
		iterator = getTodosRequest(action);
	});

	it('calls endpoint with action href', () => {
        expect(iterator.next().value).toEqual(call(fetchData, url, {headers: {'Session-Token': 'socooltoken'}}));
	});

	it('fires store todos action', () => {
        iterator.next();
        expect(iterator.next({response: {data: {todos: [1, 2, 3], _links: links}}}).value)
            .toEqual(put({type: 'STORE_TODOS_ACTION', todos: [1, 2, 3]}));
    });
});

describe('getDeferredTodosRequest', () => {
	let iterator;

	let url = 'http://some.api/someLink';
    let action = {
        type: 'GET_DEFERRED_TODOS_REQUEST_ACTION',
        link: {href: url}
    };
    let links = {
        something: {href: "tisket"},
        somethingElse: {href: "tasket"}
    };

	beforeEach(() => {
        localStorage.getItem = jest.fn(() => {return 'socooltoken'});
		iterator = getDeferredTodosRequest(action);
	});

	it('calls endpoint with action href', () => {
        expect(iterator.next().value).toEqual(call(fetchData, url, {headers: {'Session-Token': 'socooltoken'}}));
	});

	it('fires store deferred todos action', () => {
        iterator.next();
        expect(iterator.next({response: {data: {todos: [1, 2, 3], _links: links}}}).value)
            .toEqual(put({type: 'STORE_DEFERRED_TODOS_ACTION', todos: [1, 2, 3]}));
    });
});

describe('getCompletedTodosRequest', () => {
	let iterator;

	let url = 'http://some.api/someLink';
    let action = {
        type: 'GET_COMPLETED_TODOS_REQUEST_ACTION',
        link: {href: url}
    };
    let links = {
        something: {href: "tisket"},
        somethingElse: {href: "tasket"}
    };

	beforeEach(() => {
        localStorage.getItem = jest.fn(() => {return 'socooltoken'});
		iterator = getCompletedTodosRequest(action);
	});

	it('calls endpoint with action href', () => {
        expect(iterator.next().value).toEqual(call(fetchData, url, {headers: {'Session-Token': 'socooltoken'}}));
	});

	it('fires store completed todos action', () => {
        iterator.next();
        expect(iterator.next({response: {data: {todos: [1, 2, 3], _links: links}}}).value)
            .toEqual(put({type: 'STORE_COMPLETED_TODOS_ACTION', todos: [1, 2, 3]}));
    });

    it('fires store links action', () => {
        iterator.next();
        iterator.next({response: {data: {todos: [1, 2, 3], _links: links}}});
        expect(iterator.next({response: {data: {_links: links}}}).value)
            .toEqual(put({type: 'STORE_LINKS_ACTION', links: links}));
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

describe('watchGetTodosRequest', () => {
	let iterator = watchGetTodosRequest();

	it('calls get todos request saga with every get todos request action', () => {
		expect(iterator.next().value).toEqual(takeEvery('GET_TODOS_REQUEST_ACTION', getTodosRequest).next().value);
	});
});

describe('watchGetDeferredTodosRequest', () => {
	let iterator = watchGetDeferredTodosRequest();

	it('calls get deferred todos request saga with every get deferred todos request action', () => {
		expect(iterator.next().value).toEqual(takeEvery('GET_DEFERRED_TODOS_REQUEST_ACTION', getDeferredTodosRequest).next().value);
	});
});

describe('watchGetCompletedTodosRequest', () => {
	let iterator = watchGetCompletedTodosRequest();

	it('calls get completed todos request saga with every get completed todos request action', () => {
		expect(iterator.next().value).toEqual(takeEvery('GET_COMPLETED_TODOS_REQUEST_ACTION', getCompletedTodosRequest).next().value);
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