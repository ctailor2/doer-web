jest.unmock('../linksReducer');

import {links} from '../linksReducer';

describe('links', () => {
	it('has initial state', () => {
		expect(links()).toEqual({});
	});

	it('it stores the links from a STORE_LINKS_ACTION when received', () => {
		let newLinks = {a: 1, b: 2};
		let action = {
			type: 'STORE_LINKS_ACTION',
			links: newLinks
		};
		let linksState = links({c: 3, d: 2}, action);
		expect(linksState).toEqual(newLinks);
	});
});