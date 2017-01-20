jest.unmock('../baseResourcesActions');

import {getBaseResourcesRequestAction} from '../baseResourcesActions';

describe('getBaseResourcesRequestAction', () => {
	it('creates a get base resources request action', () => {
		expect(getBaseResourcesRequestAction()).toEqual({
			type: 'GET_BASE_RESOURCES_REQUEST_ACTION'
		});
	});
});