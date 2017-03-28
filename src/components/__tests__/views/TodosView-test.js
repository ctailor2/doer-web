jest.unmock('../../views/TodosView');

import {shallow} from 'enzyme';
import React from 'react';
import {TodosView, mapStateToProps} from '../../views/TodosView';
import Header from '../../Header';
import App from '../../App';

describe('TodosView', () => {
	let tree, mockLoadTodosViewActionFn;

	beforeEach(() => {
		mockLoadTodosViewActionFn = jest.fn();
	    localStorage.getItem = jest.fn(() => {return 'http://some.api/endpoint'});
		tree = shallow(<TodosView viewLoaded={false} loadTodosViewAction={mockLoadTodosViewActionFn} />,
                       {lifecycleExperimental: true});
	});

    it('fires load todos view action when mounted', () => {
        expect(mockLoadTodosViewActionFn).toBeCalled();
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

    it('renders the app when view is loaded', () => {
        tree.setProps({viewLoaded: true});
        expect(tree.find(App).length).toBe(1);
    });

	it('maps state to props', () => {
	    let state = {loadView: {todosViewLoaded: true}};
	    expect(mapStateToProps(state)).toEqual({
	        viewLoaded: true
	    });
	});
});