import * as actionTypes from '../constants/actionTypes';

export function getHomeResourcesRequestAction(link = {}) {
	return {
		type: actionTypes.GET_HOME_RESOURCES_REQUEST_ACTION,
		link: link
	}
}