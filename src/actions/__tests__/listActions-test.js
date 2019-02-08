import {
	getListRequestAction,
	getCompletedListRequestAction,
	storeListAction,
	storeCompletedListAction,
	unlockListRequestAction
} from '../listActions';
import {ActionTypes} from '../../constants/actionTypes';

describe('getListRequestAction', () => {
	it('creates a get list request action with empty link by default', () => {
		expect(getListRequestAction()).toEqual({
			type: ActionTypes.GET_LIST_REQUEST_ACTION,
			link: {}
		});
	});

	it('creates a get list request action with supplied link', () => {
		let link = {href: 'http://some.api/todos'};
		expect(getListRequestAction(link)).toEqual({
			type: ActionTypes.GET_LIST_REQUEST_ACTION,
			link: link
		});
	});
});

describe('getCompletedListRequestAction', () => {
	it('creates a get completed list request action with empty link by default', () => {
		expect(getCompletedListRequestAction()).toEqual({
			type: ActionTypes.GET_COMPLETED_LIST_REQUEST_ACTION,
			link: {}
		});
	});

	it('creates a get completed list request action with supplied link', () => {
		let link = {href: 'http://some.api/todos'};
		expect(getCompletedListRequestAction(link)).toEqual({
			type: ActionTypes.GET_COMPLETED_LIST_REQUEST_ACTION,
			link: link
		});
	});
});

describe('unlockListRequestAction', () => {
	it('creates an unlock list request action with empty link by default', () => {
		expect(unlockListRequestAction()).toEqual({
			type: ActionTypes.UNLOCK_LIST_REQUEST_ACTION,
			link: {}
		});
	});

	it('creates an unlock list request action with supplied link', () => {
		let link = {href: 'http://some.api/todos'};
		expect(unlockListRequestAction(link)).toEqual({
			type: ActionTypes.UNLOCK_LIST_REQUEST_ACTION,
			link: link
		});
	});
});

describe('storeListAction', () => {
	it('creates a store list action with empty list by default', () => {
		expect(storeListAction()).toEqual({
			type: ActionTypes.STORE_LIST_ACTION,
			list: {}
		});
	});

	it('creates a store list action with supplied list', () => {
		let list = {someProperty: 'someValue'};
		expect(storeListAction(list)).toEqual({
			type: ActionTypes.STORE_LIST_ACTION,
			list: list
		});
	});
});

describe('storeCompletedListAction', () => {
	it('creates a store completed list action with empty list by default', () => {
		expect(storeCompletedListAction()).toEqual({
			type: ActionTypes.STORE_COMPLETED_LIST_ACTION,
			list: {}
		});
	});

	it('creates a store completed list action with supplied list', () => {
		let list = {someProperty: 'someValue'};
		expect(storeCompletedListAction(list)).toEqual({
			type: ActionTypes.STORE_COMPLETED_LIST_ACTION,
			list: list
		});
	});
});
