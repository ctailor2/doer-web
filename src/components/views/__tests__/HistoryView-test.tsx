import {configure, shallow, ShallowWrapper} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import {browserHistory} from 'react-router';
import Header from '../../Header';
import History from '../../History';
import {HistoryView, mapStateToProps} from '../HistoryView';
import Loader from '../Loader';

describe('HistoryView', () => {
    let tree: ShallowWrapper;
    let mockLoadHistoryViewActionFn: jest.Mock;

    beforeEach(() => {
        configure({ adapter: new Adapter() });
        browserHistory.push = jest.fn();
        mockLoadHistoryViewActionFn = jest.fn();
        tree = shallow(<HistoryView list={null} loadHistoryViewAction={mockLoadHistoryViewActionFn} />);
    });

    it('redirects to the login page if a sessionToken is not present', () => {
        tree = shallow(<HistoryView
            list={{todos: []}} loadHistoryViewAction={mockLoadHistoryViewActionFn} />);
        expect(browserHistory.push).toBeCalledWith('/login');
        expect(mockLoadHistoryViewActionFn).not.toBeCalled();
    });

    it('fires load history view action when mounted', () => {
        localStorage.setItem('sessionToken', 'cooltoken');
        mockLoadHistoryViewActionFn.mockClear();
        // @ts-ignore
        browserHistory.push.mockClear();
        tree = shallow(<HistoryView
            list={{todos: []}} loadHistoryViewAction={mockLoadHistoryViewActionFn} />);
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
        expect(tree.find(Loader).length).toBe(1);
    });

    it('renders the history when list is not empty', () => {
        tree.setProps({list: {name: 'neat list'}});
        expect(tree.find(History).length).toBe(1);
    });

    it('maps state to props', () => {
        const completedList = {todos: [{task: 'neat list', completedAt: 'someTime'}]};
        const state = {
            completedList,
            links: {},
            list: null,
            errors: {
                fieldErrors: [],
                globalErrors: [],
            },
        };
        expect(mapStateToProps(state)).toEqual({
            list: completedList,
        });
    });
});
