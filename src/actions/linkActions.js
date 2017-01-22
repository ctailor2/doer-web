import * as actionTypes from '../constants/actionTypes';

export function storeLinksAction(links = {}) {
	return {
		type: actionTypes.STORE_LINKS_ACTION,
		links: links
	}
}

export function persistLinkAction(link = {}) {
	return {
		type: actionTypes.PERSIST_LINK_ACTION,
		link: link
	}
}