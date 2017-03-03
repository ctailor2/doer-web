jest.unmock('../../views/TodosView');

import {shallow} from 'enzyme';
import React from 'react';
import {TodosView, mapStateToProps} from '../../views/TodosView';
import Header from '../../Header';
import App from '../../App';

describe('TodosView', () => {
	let tree, mockGetHomeResourcesRequestActionFn, mockGetTodosRequestActionFn;

	beforeEach(() => {
		mockGetHomeResourcesRequestActionFn = jest.fn();
		mockGetTodosRequestActionFn = jest.fn();
	    localStorage.getItem = jest.fn(() => {return 'http://some.api/endpoint'});
		tree = shallow(<TodosView links={{}}
								  getTodosRequestAction={mockGetTodosRequestActionFn}
                                  getHomeResourcesRequestAction={mockGetHomeResourcesRequestActionFn} />,
                       {lifecycleExperimental: true});
	});

    it('fires get home resources request action with link from localStorage when mounted', () => {
        expect(mockGetHomeResourcesRequestActionFn).toBeCalledWith({href: 'http://some.api/endpoint'});
    });

	it('renders', () => {
		expect(tree.length).toBe(1);
	});

	it('has a header', () => {
	    expect(tree.find(Header).length).toBe(1);
	});

    it('renders the splash view when links are empty', () => {
        expect(tree.find('SplashView').length).toBe(1);
    });

    it('renders the app when links are not empty', () => {
        tree.setProps({links: {something: {href: 'http://some.api/something'}}});
        expect(tree.find(App).length).toBe(1);
    });

    it('fires get todos request action with todosLink when links become available', () => {
        let todosLink = {href: 'http://some.api/todos'};
		tree.setProps({links: {todos: todosLink}});

        expect(mockGetTodosRequestActionFn).toBeCalledWith(todosLink);
    });

    it('does not fire get todos request action when links are already available', () => {
        let todosLink = {href: 'http://some.api/todos'};
        tree = shallow(<TodosView links={{todos: todosLink}}
        								  getTodosRequestAction={mockGetTodosRequestActionFn}
                                          getHomeResourcesRequestAction={mockGetHomeResourcesRequestActionFn} />,
                               {lifecycleExperimental: true});
		tree.setProps({links: {todos: todosLink}});

        expect(mockGetTodosRequestActionFn).not.toBeCalled();
    });

	it('maps state to props', () => {
		let links = {something: {href: 'http://some.api/something'}};
	    let state = {links: links};
	    expect(mapStateToProps(state)).toEqual({
	        links: links
	    });
	});
});
