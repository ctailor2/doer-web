import {
	getListRequestAction,
	storeListAction,
	unlockListRequestAction
} from '../listActions';

describe('getListRequestAction', () => {
	it('creates a get list request action with empty link by default', () => {
		expect(getListRequestAction()).toEqual({
			type: 'GET_LIST_REQUEST_ACTION',
			link: {}
		});
	});

	it('creates a get list request action with supplied link', () => {
		let link = {href: 'http://some.api/todos'};
		expect(getListRequestAction(link)).toEqual({
			type: 'GET_LIST_REQUEST_ACTION',
			link: link
		});
	});
});

describe('unlockListRequestAction', () => {
	it('creates an unlock list request action with empty link by default', () => {
		expect(unlockListRequestAction()).toEqual({
			type: 'UNLOCK_LIST_REQUEST_ACTION',
			link: {}
		});
	});

	it('creates an unlock list request action with supplied link', () => {
		let link = {href: 'http://some.api/todos'};
		expect(unlockListRequestAction(link)).toEqual({
			type: 'UNLOCK_LIST_REQUEST_ACTION',
			link: link
		});
	});
});

describe('storeListAction', () => {
	it('creates a store list action with empty list by default', () => {
		expect(storeListAction()).toEqual({
			type: 'STORE_LIST_ACTION',
			list: {}
		});
	});

	it('creates a store list action with supplied list', () => {
		let list = {someProperty: 'someValue'};
		expect(storeListAction(list)).toEqual({
			type: 'STORE_LIST_ACTION',
			list: list
		});
	});
});
