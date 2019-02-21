import { Link } from '../api/api';
import { ActionTypes } from '../constants/actionTypes';

export interface StoreLinksAction {
    type: ActionTypes.STORE_LINKS_ACTION;
    links: { [name: string]: Link };
}

export const storeLinksAction = (links: { [name: string]: Link }): StoreLinksAction => ({
    type: ActionTypes.STORE_LINKS_ACTION,
    links,
});

export interface PersistLinkAction {
    type: ActionTypes.PERSIST_LINK_ACTION;
    link: Link;
}

export const persistLinkAction = (link: Link): PersistLinkAction => ({
    type: ActionTypes.PERSIST_LINK_ACTION,
    link,
});
