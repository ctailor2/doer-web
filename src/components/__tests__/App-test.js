jest.unmock('../App');

import {App, mapStateToProps} from '../App';
import React from 'react';
import {shallow} from 'enzyme';
import Header from '../Header';

describe('App', () => {
    let tree, todos;

    beforeEach(() => {
        todos = [];
        tree = shallow(<App todos={todos}/>);
    });

    it('renders', () => {
        expect(tree.length).toBe(1);
    });

    it('has a header', () => {
        expect(tree.find(Header).length).toBe(1);
    });

    describe('form', () => {
        let form;

        beforeEach(() => {
            form = tree.find('form');
        });

        it('renders', () => {
            expect(form.length).toBe(1);
        });

        describe('text input', () => {
            let input;

            beforeEach(() => {
                input = form.find('FormControl');
            });

            it('renders', () => {
                expect(input.length).toBe(1);
            });

            it('has no value by default', () => {
                expect(input.prop('value')).toBeUndefined();
            });
        });

        describe('submit button', () => {
            let button;

            beforeEach(() => {
                button = form.find('Button');
            });

            it('renders', () => {
                expect(button.length).toBe(1);
                expect(button.childAt(0).text()).toBe('Do!');
                expect(button.prop('type')).toBe('button');
                expect(button.prop('bsStyle')).toBe('primary');
            });

            it('is disabled by default', () => {
                expect(button.prop('disabled')).toBe(true);
            });
        });
    });

    describe('list', () => {
        let list;

        beforeEach(() => {
            list = tree.find('ListGroup');
        });

        it('renders', () => {
            expect(list.length).toBe(1);
        });

        describe('without todos', () => {
            it('does not contain any items', () => {
                expect(list.find('ListGroupItem').length).toBe(0);
            });
        });

        describe('with todos', () => {
            let todo1, todo2;

            beforeEach(() => {
                let todos = [{task: 'thing one'}, {task: 'thing two'}];
                tree.setProps({todos: todos});
                list = tree.find('ListGroup');
            });

	        it('contains an item for each todo', () => {
	            expect(list.find('ListGroupItem').length).toBe(2);
	        });

	        describe('each todo', () => {
	            let todo

	            beforeEach(() => {
	                todo = list.find('ListGroupItem').at(0);
	            });

	            it('contains its task', () => {
	                expect(todo.childAt(0).text()).toContain('thing one');
	            });
	        });
        });
    });

    it('maps state to props', () => {
        let state = {todos: []};
        expect(mapStateToProps(state)).toEqual({
            todos: []
        });
    });
});