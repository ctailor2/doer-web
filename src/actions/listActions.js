import {ActionTypes} from '../constants/actionTypes';

export function getListRequestAction(link = {}) {
	return {
		type: ActionTypes.GET_LIST_REQUEST_ACTION,
		link: link
	}
}

export function getCompletedListRequestAction(link = {}) {
	return {
		type: ActionTypes.GET_COMPLETED_LIST_REQUEST_ACTION,
		link: link
	}
}

export function storeListAction(list = {}) {
    return {
		type: ActionTypes.STORE_LIST_ACTION,
		list: list
	}
}

export function storeCompletedListAction(list = {}) {
    return {
		type: ActionTypes.STORE_COMPLETED_LIST_ACTION,
		list: list
	}
}

export function unlockListRequestAction(link = {}) {
	return {
		type: ActionTypes.UNLOCK_LIST_REQUEST_ACTION,
		link: link
	}
}