jest.unmock('../../views/HistoryView');

import {shallow} from 'enzyme';
import React from 'react';
import {HistoryView, mapStateToProps} from '../../views/HistoryView';
import Header from '../../Header';
import History from '../../History';

describe('HistoryView', () => {
	let tree, mockLoadHistoryViewActionFn;

	beforeEach(() => {
		mockLoadHistoryViewActionFn = jest.fn();
	    localStorage.getItem = jest.fn(() => {return 'http://some.api/endpoint'});
		tree = shallow(<HistoryView viewLoaded={false} loadHistoryViewAction={mockLoadHistoryViewActionFn} />,
                       {lifecycleExperimental: true});
	});

    it('fires load history view action when mounted', () => {
        expect(mockLoadHistoryViewActionFn).toBeCalled();
    });

	it('renders', () => {
		expect(tree.length).toBe(1);
	});

	it('has a header', () => {
	    expect(tree.find(Header).length).toBe(1);
	});

    it('renders the loader when view is not loaded', () => {
        expect(tree.find('Loader').length).toBe(1);
    });

    it('renders the history when view is loaded', () => {
        tree.setProps({viewLoaded: true});
        expect(tree.find(History).length).toBe(1);
    });

	it('maps state to props', () => {
	    let state = {loadView: {historyViewLoaded: true}};
	    expect(mapStateToProps(state)).toEqual({
	        viewLoaded: true
	    });
	});
});
