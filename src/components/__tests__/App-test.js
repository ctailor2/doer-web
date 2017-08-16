jest.unmock('../App');

import _ from 'lodash';
import {App, mapStateToProps} from '../App';
import Todo from '../Todo';
import React from 'react';
import {mount, ReactWrapper} from 'enzyme';

describe('App', () => {
    let tree,
    input,
    list,
    nowTodos,
    laterTodos,
    links,
    todoNowLink,
    todoLaterLink,
    pullLink,
    unlockLink,
    mockCreateTodoActionFn,
    mockDisplaceTodoActionFn,
    mockPullTodosActionFn,
    mockMoveTodoActionFn,
    mockUnlockListActionFn;

    beforeEach(() => {
        mockCreateTodoActionFn = jest.fn();
        mockDisplaceTodoActionFn = jest.fn();
        mockMoveTodoActionFn = jest.fn();
        mockPullTodosActionFn = jest.fn();
        mockUnlockListActionFn = jest.fn();
        nowTodos = [];
        laterTodos = [];
        todoNowLink = {href: 'http://some.api/todoNow'};
        todoLaterLink = {href: 'http://some.api/todoLater'};
        pullLink = {href: 'http://some.api/pullTodos'};
        list = {
            name: 'name',
            deferredName: 'deferredname',
            _links: {
                create: todoNowLink,
                createDeferred: todoLaterLink
            }
        };
        tree = mount(<App list={list}
                          nowTodos={nowTodos}
                          laterTodos={laterTodos}
                          createTodoRequestAction={mockCreateTodoActionFn}
                          displaceTodoRequestAction={mockDisplaceTodoActionFn}
                          moveTodoRequestAction={mockMoveTodoActionFn}
                          pullTodosRequestAction={mockPullTodosActionFn}
                          unlockListRequestAction={mockUnlockListActionFn}/>);
        input = tree.node.taskInput;
    });

    it('renders', () => {
        expect(tree.length).toBe(1);
    });

    it('has default state', () => {
        expect(tree.state()).toEqual({
            todo: {task: ''},
            submitting: false,
            showUnlockConfirmation: false,
            activeTab: 'name'
        });
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

            it('renders 2 buttons when create link is missing', () => {
                let listWithoutCreateLink = _.clone(list);
                delete listWithoutCreateLink._links.create
                tree.setProps({list: listWithoutCreateLink})
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

            describe('when tabKey matches list name', () => {
                beforeEach(() => {
                    handler('name');
                });

                it('updates activeTab state', () => {
                    expect(tree.state().activeTab).toEqual('name');
                });

                it('does not update showUnlockConfirmation state', () => {
                    expect(tree.state().showUnlockConfirmation).toBe(false);
                });
            });

            describe('when tabKey matches deferred list name', () => {
                beforeEach(() => {
                    handler('deferredName');
                });

                it('does not update activeTab state', () => {
                    handler('someTabKey');
                    expect(tree.state().activeTab).not.toEqual('someTabKey');
                });

                it('updates showUnlockConfirmation to true', () => {
                    handler('someTabKey');
                    expect(tree.state().showUnlockConfirmation).toEqual(true);
                });

                describe('when the deferredTodos link is present', () => {
                    beforeEach(() => {
                        let listWithProps = _.clone(list);
                        listWithProps._links.deferredTodos = {href: 'http://some.api/deferredTodos'}
                        listWithProps.unlockDuration = 1700000;
                        tree.setProps({list: listWithProps});
                    });

                    it('updates activeTab state to tabKey', () => {
                        handler('someTabKey');
                        expect(tree.state().activeTab).toEqual('someTabKey');
                    });
                });
            });
        });

        describe('first tab', () => {
            let tab;

            beforeEach(() => {
                tab = tabs.find('Tab').at(0);
            });

            it('has eventKey matching list name', () => {
                expect(tab.prop('eventKey')).toEqual('name');
            });

            it('has Title matching title cased list name', () => {
                expect(tab.prop('title')).toEqual('Name');
            });

            describe('clickable list item', () => {
                let item;

                beforeEach(() => {
                    item = tab.find('ListGroupItem').find('[onClick]');
                });

                it('does not render by default', () => {
                    expect(item.length).toBe(0);
                });

                it('renders when the pull link is present', () => {
                    let listWithPullLink = _.clone(list);
                    listWithPullLink._links.pull = pullLink;
                    tree.setProps({list: listWithPullLink});
                    tabs = tree.find('Tabs');
                    tab = tabs.find('Tab').at(0);
                    item = tab.find('ListGroupItem').find('[onClick]');
                    expect(item.length).toBe(1);
                });

                describe('when rendered', () => {
                    beforeEach(() => {
                        let listWithPullLink = _.clone(list);
                        listWithPullLink._links.pull = pullLink;
                        tree.setProps({list: listWithPullLink});
	                    tabs = tree.find('Tabs');
	                    tab = tabs.find('Tab').at(0);
	                    item = tab.find('ListGroupItem').find('[onClick]');
                    });

                    it('fires pull todos action with pullLink', () => {
                        item.simulate('click');
		                expect(mockPullTodosActionFn).toBeCalledWith(pullLink);
                    });
                });
            });
        });

        describe('second tab', () => {
            let tab;

            beforeEach(() => {
                tab = tabs.find('Tab').at(1);
            });

            it('has eventKey matching deferredName', () => {
                expect(tab.prop('eventKey')).toEqual('deferredname');
            });

            it('has a title', () => {
                expect(tab.prop('title')).not.toBeUndefined();
            });

            it('is disabled by default', () => {
                expect(tab.prop('disabled')).toBe(true);
            });

            describe('when the unlock link is present', () => {
                beforeEach(() => {
                    let listWithUnlockLink = _.clone(list);
                    listWithUnlockLink._links.unlock = {href: 'http://some.api/unlock'}
                    tree.setProps({list: listWithUnlockLink});
                    tabs = tree.find('Tabs');
                    tab = tabs.find('Tab').at(1);
                });

                it('is not disabled', () => {
                    expect(tab.prop('disabled')).toBe(false);
                });
            });

            describe('when the deferredTodos link is present', () => {
                beforeEach(() => {
                    let listWithProps = _.clone(list);
                    listWithProps._links.deferredTodos = {href: 'http://some.api/deferredTodos'}
                    listWithProps.unlockDuration = 1700000;
                    tree.setProps({list: listWithProps});
                    tabs = tree.find('Tabs');
                    tab = tabs.find('Tab').at(1);
                });

                it('is not disabled', () => {
                    expect(tab.prop('disabled')).toBe(false);
                });
            });

            describe('title', () => {
                let titleNode;

                beforeEach(() => {
                    titleNode = mount(tab.prop('title'));
                });

                it('contains capitalized deferredName', () => {
                    expect(titleNode.text()).toContain('Deferredname');
                });

                it('contains an icon', () => {
                    expect(titleNode.find('Glyphicon').length).toEqual(1);
                });

                describe('when the deferredTodos link is present', () => {
                    beforeEach(() => {
                        let listWithProps = _.clone(list);
                        listWithProps._links.deferredTodos = {href: 'http://some.api/deferredTodos'}
                        listWithProps.unlockDuration = 1700000;
                        tree.setProps({list: listWithProps});
                        tabs = tree.find('Tabs');
                        tab = tabs.find('Tab').at(1);
                        titleNode = mount(tab.prop('title'));
                    });

                    it('does not contain an icon', () => {
                        expect(titleNode.find('Glyphicon').length).toEqual(0);
                    });

                    it('contains the unlock duration in minutes and seconds', () => {
                        expect(titleNode.text()).toContain('28:20');
                    });
                });
            });
        });
    });

    describe('modal', () => {
        let modal;

        beforeEach(() => {
            modal = tree.find('Modal').at(0);
        });

        it('renders', () => {
            expect(modal.length).toEqual(1);
        });

        it('has show state matching showUnlockConfirmation', () => {
            tree.setState({showUnlockConfirmation: true});
            modal = tree.find('Modal').at(0);
            expect(modal.prop('show')).toEqual(true);
        });

        describe('dialog element, when rendered', () => {
            let dialogElement, unlockLink;

            beforeEach(() => {
                tree.setState({showUnlockConfirmation: true});
                let listWithUnlockLink = _.clone(list);
                unlockLink = {href: 'http://some.api/unlock'};
                listWithUnlockLink._links.unlock = unlockLink;
                tree.setProps({list: listWithUnlockLink});
                modal = tree.find('Modal').at(0);
                let dialogElementNode = modal.getNode()._modal.getDialogElement()
                dialogElement = new ReactWrapper(dialogElementNode, dialogElementNode);
            });

            it('renders', () => {
                expect(dialogElement.length).toEqual(1);
            });

            it('contains 2 buttons', () => {
                expect(dialogElement.find('Button').length).toEqual(2);
            });

            describe('first button', () => {
                let button;

                beforeEach(() => {
                    button = dialogElement.find('Button').at(0);
                });

                it('updates showUnlockConfirmation state to false on click', () => {
                    button.simulate('click');
                    expect(tree.state().showUnlockConfirmation).toBe(false)
                });
            });

            describe('second button', () => {
                let button;

                beforeEach(() => {
                    button = dialogElement.find('Button').at(1);
                });

                it('fires unlock list request action with list unlockLink', () => {
                    button.simulate('click');
                    expect(mockUnlockListActionFn).toBeCalledWith(unlockLink);
                });

                it('updates showUnlockConfirmation state to false on click', () => {
                    button.simulate('click');
                    expect(tree.state().showUnlockConfirmation).toBe(false)
                });
            });
        });
    });

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
            let todo1, todo2, laterTodo1, laterTodo2, deleteLinkOne;

            beforeEach(() => {
                deleteLinkOne = {href: 'http://some.api/deleteTodoOne'};
                todo1 = {task: 'thing one', _links: {delete: deleteLinkOne}};
                todo2 = {task: 'thing two', _links: {delete: {href: 'http://some.api/deleteTodoTwo'}}};
                laterTodo1 = {task: 'later thing one'};
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
	                    let moveLink = {href: 'http://some.api/moveTodo'};
	                    moveHandler(moveLink);
	                    expect(mockMoveTodoActionFn).toBeCalledWith(moveLink);
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
        let state = {
            todos: {active: [1], inactive: [3]},
            list: list
        };
        expect(mapStateToProps(state)).toEqual({
            nowTodos: [1],
            laterTodos: [3],
            list: list
        });
    });
});