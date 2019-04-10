import {shallow, configure} from 'enzyme';
import React from 'react';
import {TodosView, mapStateToProps} from '../../views/TodosView';
import Header from '../../Header';
import App from '../../App';
import {browserHistory} from 'react-router';
import Loader from '../../views/Loader';
import Adapter from 'enzyme-adapter-react-16';

describe('TodosView', () => {
	let tree, mockLoadTodosViewActionFn;

	beforeEach(() => {
        configure({ adapter: new Adapter() });
		mockLoadTodosViewActionFn = jest.fn();
        browserHistory.push = jest.fn();
		tree = shallow(<TodosView viewLoaded={false} loadTodosViewAction={mockLoadTodosViewActionFn} />);
	});

    it('redirects to the login page if a sessionToken is not present', () => {
        tree = shallow(<TodosView viewLoaded={false} loadTodosViewAction={mockLoadTodosViewActionFn} />);
        expect(browserHistory.push).toBeCalledWith('/login');
        expect(mockLoadTodosViewActionFn).not.toBeCalled();
    });

    it('fires load todos view action when mounted if a sessionToken is present', () => {
        localStorage.setItem('sessionToken', 'cooltoken')
        mockLoadTodosViewActionFn.mockClear();
        browserHistory.push.mockClear();
        tree = shallow(<TodosView viewLoaded={false} loadTodosViewAction={mockLoadTodosViewActionFn} />);
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
        tree.setProps({list: {name: 'cool list'}});
        expect(tree.find(App).length).toBe(1);
    });

	it('maps state to props', () => {
	    let list = {name: 'cool list'};
	    let state = {list: list};
	    expect(mapStateToProps(state)).toEqual({
	        list: list
	    });
	});
});
