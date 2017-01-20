jest.unmock('../linkActions');

import {storeLinksAction} from '../linkActions';

describe('storeLinksAction', () => {
	it('creates a store links action with empty links by default', () => {
		expect(storeLinksAction()).toEqual({
			type: 'STORE_LINKS_ACTION',
			links: {}
		});
	});

	it('creates a store links action with the supplied links', () => {
		let links = {a: 1, b: 2};
		expect(storeLinksAction(links)).toEqual({
			type: 'STORE_LINKS_ACTION',
			links: links
		});
	});
});