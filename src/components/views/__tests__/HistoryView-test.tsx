import { configure, shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { browserHistory } from 'react-router';
import { Link } from '../../../api/api';
import { ListAndLink } from '../../../api/list';
import Header from '../../Header';
import History from '../../History';
import { HistoryView, mapStateToProps } from '../HistoryView';
import Loader from '../Loader';

describe('HistoryView', () => {
    let tree: ShallowWrapper;
    let mockLoadHistoryViewActionFn: jest.Mock;
    let mockGetCompletedListRequestActionFn: jest.Mock;
    let completedListLink: Link;

    beforeEach(() => {
        configure({ adapter: new Adapter() });
        browserHistory.push = jest.fn();
        mockLoadHistoryViewActionFn = jest.fn();
        mockGetCompletedListRequestActionFn = jest.fn();
        completedListLink = { href: 'completedListHref' };
        tree = shallow(<HistoryView
            list={null}
            completedListLink={completedListLink}
            loadHistoryViewAction={mockLoadHistoryViewActionFn}
            getCompletedListRequestAction={mockGetCompletedListRequestActionFn} />);
    });

    it('redirects to the login page if a sessionToken is not present', () => {
        mockGetCompletedListRequestActionFn.mockClear();
        mockLoadHistoryViewActionFn.mockClear();
        tree = shallow(<HistoryView
            list={{ todos: [] }}
            completedListLink={completedListLink}
            loadHistoryViewAction={mockLoadHistoryViewActionFn}
            getCompletedListRequestAction={mockGetCompletedListRequestActionFn} />);
        expect(browserHistory.push).toBeCalledWith('/login');
        expect(mockGetCompletedListRequestActionFn).not.toBeCalled();
        expect(mockLoadHistoryViewActionFn).not.toBeCalled();
    });

    it('fires get completed list request action when mounted if completedListLink is available', () => {
        localStorage.setItem('sessionToken', 'cooltoken');
        mockGetCompletedListRequestActionFn.mockClear();
        mockLoadHistoryViewActionFn.mockClear();
        // @ts-ignore
        browserHistory.push.mockClear();
        tree = shallow(<HistoryView
            list={{ todos: [] }}
            completedListLink={completedListLink}
            loadHistoryViewAction={mockLoadHistoryViewActionFn}
            getCompletedListRequestAction={mockGetCompletedListRequestActionFn} />);
        expect(mockGetCompletedListRequestActionFn).toBeCalledWith(completedListLink);
        expect(mockLoadHistoryViewActionFn).not.toBeCalled();
        expect(browserHistory.push).not.toBeCalled();
    });

    it('fires load history view action when mounted if completedListLink is not available', () => {
        localStorage.setItem('sessionToken', 'cooltoken');
        mockGetCompletedListRequestActionFn.mockClear();
        mockLoadHistoryViewActionFn.mockClear();
        // @ts-ignore
        browserHistory.push.mockClear();
        tree = shallow(<HistoryView
            list={{ todos: [] }}
            completedListLink={null}
            loadHistoryViewAction={mockLoadHistoryViewActionFn}
            getCompletedListRequestAction={mockGetCompletedListRequestActionFn} />);
        expect(mockLoadHistoryViewActionFn).toBeCalled();
        expect(mockGetCompletedListRequestActionFn).not.toBeCalled();
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
        tree.setProps({ list: { name: 'neat list' } });
        expect(tree.find(History).length).toBe(1);
    });

    it('maps state to props', () => {
        const completedList = { todos: [{ task: 'neat list', completedAt: 'someTime' }] };
        const completedLink = { href: 'completedHref' };
        const state = {
            completedList,
            links: {},
            list: {
                listAndLink: {

                    list: {
                        name: 'someName',
                        deferredName: 'someDeferredName',
                        todos: [],
                        deferredTodos: [],
                        unlockDuration: 0,
                        _links: {
                            createDeferred: { href: 'createDeferredHref' },
                            completed: completedLink,
                        },
                    },
                    listLink: { href: 'listHref' },
                },
                selectedList: null,
            },
            errors: {
                fieldErrors: [],
                globalErrors: [],
            },
            listOptions: [],
        };
        expect(mapStateToProps(state)).toEqual({
            list: completedList,
            completedListLink: completedLink,
        });
    });
});
