import { StoreLinksAction } from '../../actions/linkActions';
import { ActionTypes } from '../../constants/actionTypes'
import { links } from '../linksReducer';

describe('links', () => {
    it('has initial state', () => {
        expect(links(undefined, { type: ActionTypes.GET_BASE_RESOURCES_REQUEST_ACTION })).toEqual({});
    });

    it('stores the links from a STORE_LINKS_ACTION when received', () => {
        const newLinks = { a: { href: 'aHref' }, b: { href: 'bHref' } };
        const action: StoreLinksAction = {
            type: ActionTypes.STORE_LINKS_ACTION,
            links: newLinks,
        };
        const linksState = links({ c: { href: 'cHref' }, d: { href: 'dHref' } }, action);
        expect(linksState).toEqual(newLinks);
    });
});
