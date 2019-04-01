import { shallow, ShallowWrapper } from 'enzyme';
import React from 'react';
import { browserHistory } from 'react-router';
import App from '../../App';
import Header from '../../Header';
import Loader from '../../views/Loader';
import { mapStateToProps, Props, TodosView } from '../../views/TodosView';

describe('TodosView', () => {
    let tree: ShallowWrapper;
    let mockLoadTodosViewActionFn: jest.Mock;

    beforeEach(() => {
        mockLoadTodosViewActionFn = jest.fn();
        browserHistory.push = jest.fn();
        tree = shallow(<TodosView list={{}} loadTodosViewAction={mockLoadTodosViewActionFn} />);
    });

    it('redirects to the login page if a sessionToken is not present', () => {
        tree = shallow(<TodosView list={{}}
            loadTodosViewAction={mockLoadTodosViewActionFn} />, { lifecycleExperimental: true });
        expect(browserHistory.push).toBeCalledWith('/login');
        expect(mockLoadTodosViewActionFn).not.toBeCalled();
    });

    it('fires load todos view action when mounted if a sessionToken is present', () => {
        localStorage.setItem('sessionToken', 'cooltoken');
        tree = shallow(<TodosView list={{}}
            loadTodosViewAction={mockLoadTodosViewActionFn} />, { lifecycleExperimental: true });
        expect(mockLoadTodosViewActionFn).toBeCalled();
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
        tree.setProps({ list: { name: 'cool list' } });
        expect(tree.find(App).length).toBe(1);
    });

    it('maps state to props', () => {
        const list = { name: 'cool list' };
        const state = {
            completedList: {},
            links: {},
            list,
            errors: {
                fieldErrors: [],
                globalErrors: [],
            },
        };
        expect(mapStateToProps(state)).toEqual({
            list,
        });
    });
});
