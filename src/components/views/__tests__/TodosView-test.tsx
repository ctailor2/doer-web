import { configure, shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { browserHistory } from 'react-router';
import { ListAndLink } from '../../../api/list';
import App from '../../App';
import Header from '../../Header';
import Loader from '../Loader';
import { mapStateToProps, TodosView } from '../TodosView';

describe('TodosView', () => {
    let tree: ShallowWrapper;
    let mockLoadTodosViewActionFn: jest.Mock;

    beforeEach(() => {
        configure({ adapter: new Adapter() });
        mockLoadTodosViewActionFn = jest.fn();
        browserHistory.push = jest.fn();
        jest.spyOn(React, 'useEffect').mockImplementation(f => f());
        tree = shallow(<TodosView loadTodosViewAction={mockLoadTodosViewActionFn} list={null} selectedList={null} />);
    });

    it('redirects to the login page if a sessionToken is not present', () => {
        tree = shallow(<TodosView loadTodosViewAction={mockLoadTodosViewActionFn} list={null} selectedList={null} />);
        expect(browserHistory.push).toBeCalledWith('/login');
        expect(mockLoadTodosViewActionFn).not.toBeCalled();
    });

    it('fires load todos view action when mounted if a sessionToken is present and list is not present', () => {
        localStorage.setItem('sessionToken', 'cooltoken');
        mockLoadTodosViewActionFn.mockClear();
        // @ts-ignore
        browserHistory.push.mockClear();
        tree = shallow(<TodosView loadTodosViewAction={mockLoadTodosViewActionFn} list={null} selectedList={null} />);
        expect(mockLoadTodosViewActionFn).toBeCalled();
        expect(browserHistory.push).not.toBeCalled();
    });

    it('does nothing when mounted if a sessionToken is present and list is present', () => {
        localStorage.setItem('sessionToken', 'cooltoken');
        mockLoadTodosViewActionFn.mockClear();
        // @ts-ignore
        browserHistory.push.mockClear();
        const list: ListAndLink = {
            list: {
                name: 'someName',
                deferredName: 'someDeferredName',
                todos: [],
                deferredTodos: [],
                unlockDuration: 0,
                _links: {
                    completed: { href: 'completedHref' },
                    createDeferred: { href: 'createDeferredHref' },
                },
            },
            listLink: { href: 'listHref' },
        };
        const selectedList = 'someSelectedList';
        tree = shallow(<TodosView 
            loadTodosViewAction={mockLoadTodosViewActionFn}
            selectedList={selectedList}
            list={list} />);
        expect(mockLoadTodosViewActionFn).not.toBeCalled();
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

    it('renders the app when list is not empty', () => {
        tree.setProps({ list: { name: 'cool list' }, selectedList: 'someSelectedList' });
        expect(tree.find(App).length).toBe(1);
    });

    it('maps state to props', () => {
        const listAndLink = {
            list: {
                name: 'cool list',
                deferredName: 'neato',
                todos: [],
                deferredTodos: [],
                unlockDuration: 0,
                _links: {
                    createDeferred: { href: '' },
                    completed: { href: '' },
                },
            },
            listLink: { href: 'someLink' },
        };
        const selectedList = 'someSelectedList';
        const listState = {
            listAndLink,
            selectedList,
        };
        const state = {
            completedList: null,
            links: {},
            list: listState,
            errors: {
                fieldErrors: [],
                globalErrors: [],
            },
            listOptions: [],
        };
        expect(mapStateToProps(state)).toEqual({
            list: listAndLink,
            selectedList,
        });
    });
});
