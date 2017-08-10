import * as actionTypes from '../constants/actionTypes';

export function getListRequestAction(link = {}) {
	return {
		type: actionTypes.GET_LIST_REQUEST_ACTION,
		link: link
	}
}

export function storeListAction(list = {}) {
    return {
		type: actionTypes.STORE_LIST_ACTION,
		list: list
	}
}

export function unlockListRequestAction(link = {}) {
	return {
		type: actionTypes.UNLOCK_LIST_REQUEST_ACTION,
		link: link
	}
}