jest.unmock('../App');

import {App, mapStateToProps} from '../App';
import Todo from '../Todo';
import React from 'react';
import {mount} from 'enzyme';

describe('App', () => {
    let tree, input, nowTodos, laterTodos, links, todoNowLink, todoLaterLink, mockCreateTodoActionFn, mockGetHomeResourcesRequestActionFn, mockDisplaceTodoActionFn, mockMoveTodoActionFn;

    beforeEach(() => {
        mockCreateTodoActionFn = jest.fn();
        mockGetHomeResourcesRequestActionFn = jest.fn();
        mockDisplaceTodoActionFn = jest.fn();
        mockMoveTodoActionFn = jest.fn();
        nowTodos = [];
        laterTodos = [];
        todoNowLink = {href: 'http://some.api/todoNow'};
        todoLaterLink = {href: 'http://some.api/todoLater'};
        links = {todoNow: todoNowLink, todoLater: todoLaterLink};
        tree = mount(<App nowTodos={nowTodos}
                          laterTodos={laterTodos}
                          links={links}
                          createTodoRequestAction={mockCreateTodoActionFn}
                          displaceTodoRequestAction={mockDisplaceTodoActionFn}
                          moveTodoRequestAction={mockMoveTodoActionFn}
                          getHomeResourcesRequestAction={mockGetHomeResourcesRequestActionFn}/>);
        input = tree.node.taskInput;
    });

    it('renders', () => {
        expect(tree.length).toBe(1);
    });

    it('has default state', () => {
        expect(tree.state()).toEqual({todo: {task: ''}, submitting: false, activeTab: 'now'});
    });

    describe('text input', () => {
        let formControl;

        beforeEach(() => {
            formControl = tree.find('FormControl');
        });

        it('renders', () => {
            expect(formControl.length).toBe(1);
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

            it('toggles the submitting state to true on pressing the "submit" hotkey', () => {
                tree.find('HotKeys').at(1).props().handlers.submit();
				expect(tree.state().submitting).toBe(true);
            });
        })

        describe('when submitting state is true', () => {
            beforeEach(() => {
                tree.setState({submitting: true});
                formControl = tree.find('FormControl');
            });

            it('toggles the submitting state to false on pressing the "cancel" hotkey', () => {
                tree.find('HotKeys').at(0).props().handlers.cancel();
                expect(tree.state().submitting).toBe(false);
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
				input.value = 'something';
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

	            it('clears todo task state', () => {
	                expect(tree.state().todo.task).toEqual('');
	            });

	            it('clears the todo input value', () => {
					expect(input.value).toEqual('');
	            });

	            it('puts focus on the input', () => {
					// TODO: Cannot get this test to fail
					expect(document.activeElement).toEqual(input);
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

	            it('clears todo task state', () => {
	                expect(tree.state().todo.task).toEqual('');
	            });

	            it('clears the todo input value', () => {
					expect(input.value).toEqual('');
	            });

	            it('puts focus on the input', () => {
					// TODO: Cannot get this test to fail
					expect(document.activeElement).toEqual(input);
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
					expect(document.activeElement).toEqual(input);
				});
            });
        });
    });

    describe('tabs', () => {
        let tabs;

        beforeEach(() => {
            tabs = tree.find('Tabs');
        });

        it('renders', () => {
            expect(tabs.length).toBe(1);
        });

        it('contains 2', () => {
            expect(tabs.find('Tab').length).toBe(2);
        });

        describe('for activeTab state', () => {
            beforeEach(() => {
                tree.setState({activeTab: 'somethingElse'});
                tabs = tree.find('Tabs');
            });

            it('has the matching activeKey', () => {
                expect(tabs.prop('activeKey')).toEqual('somethingElse');
            });
        });

        describe('onSelect handler', () => {
            let handler;

            beforeEach(() => {
                handler = tabs.prop('onSelect')
            });

            it('updates activeTab state to tabKey', () => {
                handler('someTabKey');
                expect(tree.state().activeTab).toEqual('someTabKey');
            });
        });

        describe('first tab', () => {
            let tab;

            beforeEach(() => {
                tab = tabs.find('Tab').at(0);
            });

            it('eventKey is now', () => {
                expect(tab.prop('eventKey')).toEqual('now');
            });
        });

        describe('second tab', () => {
            let tab;

            beforeEach(() => {
                tab = tabs.find('Tab').at(1);
            });

            it('eventKey is later', () => {
                expect(tab.prop('eventKey')).toEqual('later');
            });
        });
    })

    describe('list', () => {
        let list;

        beforeEach(() => {
            list = tree.find('ListGroup');
        });

        it('renders for now and later todos', () => {
            expect(list.length).toBe(2);
        });

        describe('without todos', () => {
            it('does not contain any items', () => {
                expect(list.find('ListGroupItem').length).toBe(0);
            });
        });

        describe('with todos', () => {
            let todo1, todo2, laterTodo1, laterTodo2, deleteLinkOne, moveLinkOneToSelf, moveLinkOneToTwo;

            beforeEach(() => {
                deleteLinkOne = {href: 'http://some.api/deleteTodoOne'};
                todo1 = {task: 'thing one', _links: {delete: deleteLinkOne}};
                todo2 = {task: 'thing two', _links: {delete: {href: 'http://some.api/deleteTodoTwo'}}};
                moveLinkOneToSelf = {href: 'http://some.api/moveOneToSelf'};
                moveLinkOneToTwo = {href: 'http://some.api/moveOneToTwo'};
                laterTodo1 = {task: 'later thing one', _links: {move: [
					moveLinkOneToSelf,
					moveLinkOneToTwo
                ]}};
                laterTodo2 = {task: 'later thing two'};
                let todos = [todo1, todo2];
                let laterTodos = [laterTodo1, laterTodo2];
                tree.setProps({nowTodos: todos, laterTodos: laterTodos});
                list = tree.find('ListGroup');
            });

	        it('contains a Todo for each todo', () => {
	            expect(list.find(Todo).length).toBe(4);
	        });

	        describe('each todo', () => {
	            let todo;

	            beforeEach(() => {
	                todo = list.find(Todo).at(0);
	            });

	            it('has an index', () => {
	                expect(todo.prop('index')).toEqual(0);
	            });

	            describe('move handler', () => {
	                let moveHandler;

	                beforeEach(() => {
						moveHandler = todo.prop('handleMove');
	                });

	                it('fires move todo action with link for the matching target', () => {
	                    moveHandler(0, 1);
	                    expect(mockMoveTodoActionFn).toBeCalledWith(moveLinkOneToTwo);
	                });
	            });

	            it('is not readonly by default', () => {
	                expect(todo.prop('readOnly')).toBe(false);
	            });

	            it('is readonly when submitting', () => {
	                tree.setState({submitting: true});
                    list = tree.find('ListGroup');
	                todo = list.find(Todo).at(0);
	                expect(todo.prop('readOnly')).toBe(true);
	            });

	            it('has task and links', () => {
	                expect(todo.prop('task')).toEqual('thing one');
	                expect(todo.prop('links')).toEqual({delete: deleteLinkOne});
	            });

	            describe('displace handler', () => {
	                let task = 'someTask';
                    let todoToSubmit = {task: task};
                    let displaceLink = {href: 'http://some.api/displaceTodo'};

	                beforeEach(() => {
	                    tree.setState({todo: todoToSubmit, submitting: true});
                        input.value = task;

                        list = tree.find('ListGroup');
                        todo = list.find(Todo).at(0);
	                    todo.prop('handleDisplace')(displaceLink);
	                });

                    it('fires displace todo action with todo displaceLink and task', () => {
                        expect(mockDisplaceTodoActionFn).toBeCalledWith(displaceLink, todoToSubmit);
                    });

                    it('toggles submitting state to false', () => {
                        expect(tree.state().submitting).toBe(false);
                    });

                    it('clears the todo input value', () => {
                        expect(input.value).toEqual('');
                    });

                    it('puts focus on the input', () => {
						// TODO: Cannot get this test to fail
                        expect(document.activeElement).toEqual(input);
                    });
	            });
	        });
        });
    });

    it('maps state to props', () => {
        let links = {todos: {href: 'http://some.api/todos'}};
        let state = {todos: {active: [1], inactive: [3]}, links: links};
        expect(mapStateToProps(state)).toEqual({
            nowTodos: [1],
            laterTodos: [3],
            links: links
        });
    });
});