import * as actionTypes from '../constants/actionTypes';

export function storeLinksAction(links = {}) {
	return {
		type: actionTypes.STORE_LINKS_ACTION,
		links: links
	}
}