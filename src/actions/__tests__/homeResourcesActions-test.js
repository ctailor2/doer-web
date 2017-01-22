jest.unmock('../homeResourcesActions');

import {getHomeResourcesRequestAction} from '../homeResourcesActions';

describe('getHomeResourcesRequestAction', () => {
	it('creates a get home resources request action with empty url by default', () => {
		expect(getHomeResourcesRequestAction()).toEqual({
			type: 'GET_HOME_RESOURCES_REQUEST_ACTION',
			url: ''
		});
	});

	it('creates a home resources request action with supplied url', () => {
		let url = 'http://some.api/home';
        expect(getHomeResourcesRequestAction(url)).toEqual({
            type: 'GET_HOME_RESOURCES_REQUEST_ACTION',
            url: url
        });
    });
});