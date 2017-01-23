jest.unmock('../App');

import {App, mapStateToProps} from '../App';
import React from 'react';
import {mount} from 'enzyme';
import Header from '../Header';

describe('App', () => {
    let tree, input, todos, links, todoNowLink, todoLaterLink, mockCreateTodoActionFn, mockGetHomeResourcesRequestActionFn;

    beforeEach(() => {
        mockCreateTodoActionFn = jest.fn();
        mockGetHomeResourcesRequestActionFn = jest.fn();
        localStorage.getItem = jest.fn(() => {return 'http://some.api/endpoint'});
        todos = [];
        todoNowLink = {href: 'http://some.api/todoNow'};
        todoLaterLink = {href: 'http://some.api/todoLater'};
        links = {todos: {href: 'http://some.api/todos'}, todoNow: todoNowLink, todoLater: todoLaterLink};
        tree = mount(<App todos={todos} links={links} createTodoRequestAction={mockCreateTodoActionFn} getHomeResourcesRequestAction={mockGetHomeResourcesRequestActionFn}/>);
        input = tree.node.taskInput;
    });

    it('renders', () => {
        expect(tree.length).toBe(1);
    });

    it('has a header', () => {
        expect(tree.find(Header).length).toBe(1);
    });

    it('has default state', () => {
        expect(tree.state()).toEqual({todo: {task: ''}, submitting: false});
    });

    it('fires get home resources request action with link from localStorage when mounted', () => {
        mount(<App todos={todos} links={links} createTodoRequestAction={mockCreateTodoActionFn} getHomeResourcesRequestAction={mockGetHomeResourcesRequestActionFn}/>);
        expect(mockGetHomeResourcesRequestActionFn).toBeCalledWith('http://some.api/endpoint');
    });

    describe('text input', () => {
        let formControl;

        beforeEach(() => {
            formControl = tree.find('FormControl');
        });

        it('renders', () => {
            expect(formControl.length).toBe(1);
        });

        it('is enabled by default', () => {
            expect(formControl.prop('disabled')).toBe(false);
        });

        it('has no value by default', () => {
            expect(input.value).toEqual('');
        });

        it('updates todo task state on change', () => {
            formControl.simulate('change', {target: {value: 'things'}});
            expect(tree.state().todo.task).toEqual('things');
        });

        describe('when todo has a task', () => {
            beforeEach(() => {
                tree.setState({todo: {task: 'some task'}});
            });

            it('toggles the submitting state to true on pressing enter', () => {
				formControl.simulate('keypress', {key: 'Enter'});
				expect(tree.state().submitting).toBe(true);
            });
        })

        describe('when submitting state is true', () => {
            beforeEach(() => {
                tree.setState({submitting: true});
                formControl = tree.find('FormControl');
            });

            it('is disabled', () => {
                expect(formControl.prop('disabled')).toBe(true);
            });
        });
    });

    describe('buttons', () => {
        let buttons;

        beforeEach(() => {
            buttons = tree.find('Button');
        });

        it('renders 1 by default', () => {
            expect(buttons.length).toBe(1);
        });


        describe('default button', () => {
            it('is disabled by default', () => {
                let button = buttons.at(0);
                expect(button.prop('disabled')).toBe(true);
            });

            it('is disabled when the todo has a task consisting entirely of whitespace', () => {
				tree.setState({todo: {task: '  '}});
				let button = tree.find('Button').at(0);
				expect(button.prop('disabled')).toBe(true);
            });

			it('is enabled when the todo has a task', () => {
				tree.setState({todo: {task: 'hey'}});
				let button = tree.find('Button').at(0);
				expect(button.prop('disabled')).toBe(false);
			});

			it('toggles the submitting state to true on click', () => {
				tree.setState({todo: {task: 'hey'}});
				let button = tree.find('Button').at(0);
				button.simulate('click');
				expect(tree.state().submitting).toBe(true);
            });
        });

        describe('when submitting', () => {
            beforeEach(() => {
                tree.setState({todo: {task: 'something'}, submitting: true});
                buttons = tree.find('Button');
            });

            it('renders 3 buttons when all links are present', () => {
                expect(buttons.length).toBe(3);
            });

            it('renders 2 buttons when todoNow link is missing', () => {
                tree.setProps({links: {todoLater: todoLaterLink}})
                buttons = tree.find('Button');
                expect(buttons.length).toBe(2);
            });

            describe('on clicking first button', () => {
                beforeEach(() => {
                    buttons.at(0).simulate('click');
                });

	            it('fires create todo action with todoNowLink', () => {
	                expect(mockCreateTodoActionFn).toBeCalledWith(todoNowLink, {task: 'something'});
	            });

	            it('toggles submitting state to false', () => {
                    expect(tree.state().submitting).toBe(false);
	            });

	            it('clears the todo input value', () => {
					// TODO: Not sure how to test this
	            });

	            it('puts focus on the input', () => {
					// TODO: Not sure how to test this
					//	expect(document.activeElement).toEqual(input);
	            });
            });

            describe('on clicking second button', () => {
                beforeEach(() => {
                    buttons.at(1).simulate('click');
                });

	            it('fires create todo action with todoLaterLink', () => {
	                expect(mockCreateTodoActionFn).toBeCalledWith(todoLaterLink, {task: 'something'});
	            });

	            it('toggles submitting state to false', () => {
                    expect(tree.state().submitting).toBe(false);
	            });

	            it('clears the todo input value', () => {
					// TODO: Not sure how to test this
	            });

	            it('puts focus on the input', () => {
					// TODO: Not sure how to test this
					//	expect(document.activeElement).toEqual(input);
	            });
            });

            describe('on clicking third button', () => {
                beforeEach(() => {
                    buttons.at(2).simulate('click');
                });

				it('toggles submitting state to false', () => {
					expect(tree.state().submitting).toBe(false);
				});

				it('puts focus on the input', () => {
					// TODO: Not sure how to test this
					//	expect(document.activeElement).toEqual(input);
				});
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
	                expect(todo.text()).toContain('thing one');
	            });
	        });
        });
    });

    it('maps state to props', () => {
        let links = {todos: {href: 'http://some.api/todos'}};
        let state = {todos: {active: [1], inactive: [3]}, links: links};
        expect(mapStateToProps(state)).toEqual({
            todos: [1],
            links: links
        });
    });
});