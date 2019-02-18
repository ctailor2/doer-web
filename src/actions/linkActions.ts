import {ActionTypes} from '../constants/actionTypes';
import { Link } from './sessionActions';

export function storeLinksAction(links = {}) {
	return {
		type: ActionTypes.STORE_LINKS_ACTION,
		links: links
	}
}

export interface PersistLinkAction {
	type: ActionTypes.PERSIST_LINK_ACTION;
	link: Link;
}

export function persistLinkAction(link = {}) {
	return {
		type: ActionTypes.PERSIST_LINK_ACTION,
		link: link
	}
}