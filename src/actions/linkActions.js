import {ActionTypes} from '../constants/actionTypes';

export function storeLinksAction(links = {}) {
	return {
		type: ActionTypes.STORE_LINKS_ACTION,
		links: links
	}
}

export function persistLinkAction(link = {}) {
	return {
		type: ActionTypes.PERSIST_LINK_ACTION,
		link: link
	}
}