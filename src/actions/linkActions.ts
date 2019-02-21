import { Link } from '../api/api';
import { ActionTypes } from '../constants/actionTypes';

export function storeLinksAction(links = {}) {
    return {
        type: ActionTypes.STORE_LINKS_ACTION,
        links,
    };
}

export interface PersistLinkAction {
    type: ActionTypes.PERSIST_LINK_ACTION;
    link: Link;
}

export function persistLinkAction(link = {}) {
    return {
        type: ActionTypes.PERSIST_LINK_ACTION,
        link,
    };
}
