jest.unmock('../../views/HistoryView');

import {shallow} from 'enzyme';
import React from 'react';
import {HistoryView, mapStateToProps} from '../../views/HistoryView';
import Header from '../../Header';
import History from '../../History';
import {browserHistory} from 'react-router';

describe('HistoryView', () => {
    let tree, mockLoadHistoryViewActionFn;

    beforeEach(() => {
        browserHistory.push = jest.fn();
        mockLoadHistoryViewActionFn = jest.fn();
        tree = shallow(<HistoryView viewLoaded={false} loadHistoryViewAction={mockLoadHistoryViewActionFn} />);
    });

    it('redirects to the login page if a sessionToken is not present', () => {
        localStorage.getItem = jest.fn(() => {return null});
        tree = shallow(<HistoryView viewLoaded={false} loadHistoryViewAction={mockLoadHistoryViewActionFn} />, {lifecycleExperimental: true});
        expect(browserHistory.push).toBeCalledWith('/login');
        expect(mockLoadHistoryViewActionFn).not.toBeCalled();
    });

    it('fires load history view action when mounted', () => {
        localStorage.getItem = jest.fn(() => {return 'cooltoken'});
        tree = shallow(<HistoryView viewLoaded={false} loadHistoryViewAction={mockLoadHistoryViewActionFn} />, {lifecycleExperimental: true});
        expect(mockLoadHistoryViewActionFn).toBeCalled();
        expect(browserHistory.push).not.toBeCalled();
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
