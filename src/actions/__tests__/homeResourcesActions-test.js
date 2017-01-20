jest.unmock('../homeResourcesActions');

import {getHomeResourcesRequestAction} from '../homeResourcesActions';

describe('getHomeResourcesRequestAction', () => {
	it('creates a get home resources request action with empty link by default', () => {
		expect(getHomeResourcesRequestAction()).toEqual({
			type: 'GET_HOME_RESOURCES_REQUEST_ACTION',
			link: {}
		});
	});

	it('creates a home resources request action with supplied link and data', () => {
		let link = {href: 'http://some.api/home'};
        expect(getHomeResourcesRequestAction(link)).toEqual({
            type: 'GET_HOME_RESOURCES_REQUEST_ACTION',
            link: link
        });
    });
});