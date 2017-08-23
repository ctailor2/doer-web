import {storeLinksAction, persistLinkAction} from '../linkActions';

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

describe('persistLinkAction', () => {
	it('creates a persist links action with empty links by default', () => {
		expect(persistLinkAction()).toEqual({
			type: 'PERSIST_LINK_ACTION',
			link: {}
		});
	});

	it('creates a persist links action with the supplied links', () => {
		let link = {a: 1};
		expect(persistLinkAction(link)).toEqual({
			type: 'PERSIST_LINK_ACTION',
			link: link
		});
	});
});