import * as actionTypes from '../constants/actionTypes';

export function getRootResourcesRequestAction(link = {}) {
	return {
		type: actionTypes.GET_ROOT_RESOURCES_REQUEST_ACTION,
		link: link
	}
}

export function getBaseResourcesRequestAction() {
	return {
		type: actionTypes.GET_BASE_RESOURCES_REQUEST_ACTION
	}
}

export function getTodoResourcesRequestAction(link = {}) {
	return {
		type: actionTypes.GET_TODO_RESOURCES_REQUEST_ACTION,
		link: link
	}
}

export function getHistoryResourcesRequestAction(link = {}) {
	return {
		type: actionTypes.GET_HISTORY_RESOURCES_REQUEST_ACTION,
		link: link
	}
}