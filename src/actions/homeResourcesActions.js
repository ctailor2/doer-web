import * as actionTypes from '../constants/actionTypes';

export function getHomeResourcesRequestAction(url = '') {
	return {
		type: actionTypes.GET_HOME_RESOURCES_REQUEST_ACTION,
		url: url
	}
}