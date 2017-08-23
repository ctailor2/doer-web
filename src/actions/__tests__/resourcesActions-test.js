import {
    getRootResourcesRequestAction,
    getBaseResourcesRequestAction,
    getTodoResourcesRequestAction,
    getHistoryResourcesRequestAction
} from '../resourcesActions';

describe('getRootResourcesRequestAction', () => {
	it('creates a get root resources request action with empty url by default', () => {
		expect(getRootResourcesRequestAction()).toEqual({
			type: 'GET_ROOT_RESOURCES_REQUEST_ACTION',
			link: {}
		});
	});

	it('creates a root resources request action with supplied url', () => {
		let link = {href: 'http://some.api/someLink'};
        expect(getRootResourcesRequestAction(link)).toEqual({
            type: 'GET_ROOT_RESOURCES_REQUEST_ACTION',
            link: link
        });
    });
});

describe('getBaseResourcesRequestAction', () => {
	it('creates a get base resources request action', () => {
		expect(getBaseResourcesRequestAction()).toEqual({
			type: 'GET_BASE_RESOURCES_REQUEST_ACTION'
		});
	});
});

describe('getTodoResourcesRequestAction', () => {
	it('creates a get todo resources request action with empty url by default', () => {
		expect(getTodoResourcesRequestAction()).toEqual({
			type: 'GET_TODO_RESOURCES_REQUEST_ACTION',
			link: {}
		});
	});

	it('creates a todo resources request action with supplied url', () => {
		let link = {href: 'http://some.api/someLink'};
        expect(getTodoResourcesRequestAction(link)).toEqual({
            type: 'GET_TODO_RESOURCES_REQUEST_ACTION',
            link: link
        });
    });
});

describe('getHistoryResourcesRequestAction', () => {
	it('creates a get history resources request action with empty url by default', () => {
		expect(getHistoryResourcesRequestAction()).toEqual({
			type: 'GET_HISTORY_RESOURCES_REQUEST_ACTION',
			link: {}
		});
	});

	it('creates a history resources request action with supplied url', () => {
		let link = {href: 'http://some.api/someLink'};
        expect(getHistoryResourcesRequestAction(link)).toEqual({
            type: 'GET_HISTORY_RESOURCES_REQUEST_ACTION',
            link: link
        });
    });
});