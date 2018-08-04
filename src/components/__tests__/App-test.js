jest.useFakeTimers();

import _ from 'lodash';
import {App, mapStateToProps} from '../App';
import Todo from '../Todo';
import TaskForm from '../TaskForm';
import React from 'react';
import {shallow} from 'enzyme';
import {
    Tabs,
    Tab,
    Modal
} from 'react-bootstrap';

describe('App', () => {
    let tree,
    list,
    nowTodos,
    laterTodos,
    links,
    todoNowLink,
    todoLaterLink,
    pullLink,
    displaceLink,
    listLink,
    mockDisplaceTodoActionFn,
    mockPullTodosActionFn,
    mockMoveTodoActionFn,
    mockUnlockListActionFn,
    mockGetListActionFn,
    eventListenerCallbacks;

    beforeEach(() => {
        mockDisplaceTodoActionFn = jest.fn();
        mockMoveTodoActionFn = jest.fn();
        mockPullTodosActionFn = jest.fn();
        mockUnlockListActionFn = jest.fn();
        mockGetListActionFn = jest.fn();
        eventListenerCallbacks = {};
        document.addEventListener = jest.fn((event, callback) => {
            eventListenerCallbacks[event] = callback;
        });
        document.removeEventListener = jest.fn((event) => {
            delete eventListenerCallbacks[event];
        });
        nowTodos = [];
        laterTodos = [];
        todoNowLink = {href: 'http://some.api/todoNow'};
        todoLaterLink = {href: 'http://some.api/todoLater'};
        pullLink = {href: 'http://some.api/pullTodos'};
        displaceLink = {href: 'http://some.api/displaceTodo'};
        listLink = {href: 'http://some.api/list'};
        list = {
            name: 'name',
            deferredName: 'deferredname',
            unlockDuration: 1700900,
            todos: [],
            deferredTodos: [],
            _links: {
                create: todoNowLink,
                createDeferred: todoLaterLink
            }
        };
        tree = shallow(<App list={list}
                          nowTodos={nowTodos}
                          laterTodos={laterTodos}
                          listLink={listLink}
                          displaceTodoRequestAction={mockDisplaceTodoActionFn}
                          moveTodoRequestAction={mockMoveTodoActionFn}
                          pullTodosRequestAction={mockPullTodosActionFn}
                          unlockListRequestAction={mockUnlockListActionFn}
                          getListRequestAction={mockGetListActionFn}/>);
    });

    it('renders', () => {
        expect(tree.length).toBe(1);
    });

    it('has default state', () => {
        expect(tree.state().todo).toEqual({task: ''});
        expect(tree.state().submitting).toEqual(false);
        expect(tree.state().showUnlockConfirmation).toEqual(false);
        expect(tree.state().activeTab).toEqual('name');
        expect(tree.state().unlockDuration).toEqual(1700900);
    });

    describe('when mounted', () => {
        beforeEach(() => {
            tree.instance().componentDidMount();
        });

        it('should register an event listener with the document to capture changes in visibility', () => {
            expect(document.addEventListener).toBeCalled();
            expect(eventListenerCallbacks['visibilitychange']).toBeDefined();
        });

        describe('visibility change callback', () => {
            let visibilityChangeCallback;

            beforeEach(() => {
                visibilityChangeCallback = eventListenerCallbacks.visibilitychange;
            });

            it('when document is hidden', () => {
                visibilityChangeCallback({target: {hidden: true}});
                jest.runAllTimers();
                expect(tree.state().unlockDuration).toEqual(1700900);
            });

            it('when document is visible', () => {
                visibilityChangeCallback({target: {hidden: false}});
                expect(mockGetListActionFn).toBeCalledWith(listLink);
            });
        });
    });

    describe('when unmounted', () => {
        beforeEach(() => {
            tree.instance().componentDidMount();
            tree.instance().componentWillUnmount();
        });

        it('should remove the event listener from the document that is capturing changes in visibility', () => {
            expect(document.removeEventListener).toBeCalled();
            expect(eventListenerCallbacks['visibilitychange']).toBeUndefined();
        });
    });

    describe('upon receiving props', () => {
        describe('when unlockDuration is currently > 0', () => {
            describe('when unlockDuration from props is greater than current unlockDuration', () => {
                let listWithProps;

                beforeEach(() => {
                    listWithProps = _.clone(list);
                    listWithProps.unlockDuration = 1800000;
                    tree.setProps({list: listWithProps});
                });

                it('does not set unlockDuration state', () => {
                    expect(tree.state().unlockDuration).toEqual(1700900);
                });

                it('decrements unlockDuration after a second has elapsed', () => {
                    jest.runTimersToTime(1000);
                    expect(tree.state().unlockDuration).toEqual(1699900);
                });
            });

            describe('when unlockDuration from props is less than current unlockDuration', () => {
                let listWithProps;

                beforeEach(() => {
                    listWithProps = _.clone(list);
                    listWithProps.unlockDuration = 15250;
                    tree.setProps({list: listWithProps});
                });

                it('sets unlockDuration state', () => {
                    expect(tree.state().unlockDuration).toEqual(15250);
                });

                it('decrements unlockDuration after a second has elapsed', () => {
                    jest.runTimersToTime(1000);
                    expect(tree.state().unlockDuration).toEqual(14250);
                });
            });
        });

        describe('when unlockDuration is currently 0', () => {
            let listWithProps;

            beforeEach(() => {
                jest.runAllTimers();
                listWithProps = _.clone(list);
                listWithProps.unlockDuration = 15250;
                tree.setProps({list: listWithProps});
            });

            it('sets unlockDuration state', () => {
                expect(tree.state().unlockDuration).toEqual(15250);
            });

            it('decrements unlockDuration after a second has elapsed', () => {
                jest.runTimersToTime(1000);
                expect(tree.state().unlockDuration).toEqual(14250);
            });
        });
    });

    describe('unlockDuration state', () => {
        it('decrements after a second has elapsed', () => {
            jest.runTimersToTime(1000);
            expect(tree.state().unlockDuration).toEqual(1699900);
        });

        it('does not decrement when less than a second has passed', () => {
            jest.runTimersToTime(999);
            expect(tree.state().unlockDuration).toEqual(1700900);
        });

        it('does not decrement unlockDuration past zero', () => {
            jest.runTimersToTime(3000000);
            expect(tree.state().unlockDuration).toEqual(0);
        });
    });

    describe('when unlockDuration reaches 0', () => {
        beforeEach(() => {
            tree.setState({activeTab: list.deferredName});
            jest.runAllTimers();
        });

        it('fires get list request action with listLink when unlockDuration reaches 0', () => {
            expect(mockGetListActionFn).toBeCalledWith(listLink);
        });

        it('updates activeTab state', () => {
            expect(tree.state().activeTab).toEqual(list.name);
        });
    });

    describe('TaskForm', () => {
        let taskForm;

        beforeEach(() => {
            taskForm = tree.find(TaskForm);
        });

        it('renders', () => {
            expect(taskForm.length).toEqual(1);
        });

        it('has task matching state', () => {
            expect(taskForm.prop('task')).toEqual('');
        });

        it('has primaryButtonName matching list name', () => {
            expect(taskForm.prop('primaryButtonName')).toEqual('name');
        });

        it('has secondaryButtonName matching list deferredName', () => {
            expect(taskForm.prop('secondaryButtonName')).toEqual('deferredname');
        });

        it('has submitting matching state', () => {
            expect(taskForm.prop('submitting')).toBe(false);
        });

        it('has links matching list links', () => {
            expect(taskForm.prop('links')).toEqual(list._links);
        });

        describe('task change handler', () => {
            let task = 'someTask';

            beforeEach(() => {
                taskForm.prop('handleTaskChange')(task);
            });

            it('sets task state', () => {
                expect(tree.state().todo).toEqual({task: task});
            });
        });

        describe('submit change handler', () => {
            let isSubmitting = true;

            beforeEach(() => {
                taskForm.prop('handleSubmitChange')(isSubmitting);
            });

            it('sets submitting state', () => {
                expect(tree.state().submitting).toBe(isSubmitting);
            });
        });
    });

    describe('tabs', () => {
        let tabs;

        beforeEach(() => {
            tabs = tree.find(Tabs);
        });

        it('renders', () => {
            expect(tabs.length).toBe(1);
        });

        it('contains 2', () => {
            expect(tabs.find(Tab).length).toBe(2);
        });

        describe('for activeTab state', () => {
            beforeEach(() => {
                tree.setState({activeTab: 'somethingElse'});
                tabs = tree.find(Tabs);
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
                tab = tabs.find(Tab).at(0);
            });

            it('has eventKey matching list name', () => {
                expect(tab.prop('eventKey')).toEqual('name');
            });

            it('has Title matching title cased list name', () => {
                expect(tab.prop('title')).toEqual('Name');
            });

            describe('displace button', () => {
                let button;

                beforeEach(() => {
                    button = tab.find('ListGroupItem').find('[onClick]').find('.displace');
                });

                it('does not render by default', () => {
                    expect(button.length).toBe(0);
                });

                it('renders when the displace link is present and submitting state is true', () => {
                    let listWithDisplaceLink = _.clone(list);
                    listWithDisplaceLink._links.displace = displaceLink;
                    tree.setState({submitting: true});
                    tree.setProps({list: listWithDisplaceLink});
                    tabs = tree.find(Tabs);
                    tab = tabs.find(Tab).at(0);
                    button = tab.find('ListGroupItem').find('[onClick]').find('.displace');
                    expect(button.length).toBe(1);
                });

                it('does not render when the displace link is present and submitting state is false', () => {
                    let listWithDisplaceLink = _.clone(list);
                    listWithDisplaceLink._links.displace = displaceLink;
                    tree.setState({submitting: false});
                    tree.setProps({list: listWithDisplaceLink});
                    tabs = tree.find(Tabs);
                    tab = tabs.find(Tab).at(0);
                    button = tab.find('ListGroupItem').find('[onClick]').find('.displace');
                    expect(button.length).toBe(0);
                });

                describe('when rendered, on click', () => {
                    let todoToSubmit = {task: 'some task'};

                    beforeEach(() => {
                        let listWithDisplaceLink = _.clone(list);
                        listWithDisplaceLink._links.displace = displaceLink;
                        tree.setState({todo: todoToSubmit, submitting: true});
                        tree.setProps({list: listWithDisplaceLink});
                        tabs = tree.find(Tabs);
                        tab = tabs.find(Tab).at(0);
                        button = tab.find('ListGroupItem').find('[onClick]').find('.displace');
                        button.simulate('click');
                    });

                    it('fires displace todos action with displaceLink', () => {
                        expect(mockDisplaceTodoActionFn).toBeCalledWith(displaceLink, todoToSubmit);
                    });

                    it('toggles submitting state to false', () => {
                        expect(tree.state().submitting).toBe(false);
                    });

                    it('clears the todo task state', () => {
                        expect(tree.state().todo).toEqual({task: ''});
                    });
                });
            });

            describe('replenish button', () => {
                let button;

                beforeEach(() => {
                    button = tab.find('ListGroupItem').find('[onClick]').find('.refresh');
                });

                it('does not render by default', () => {
                    expect(button.length).toBe(0);
                });

                it('renders when the pull link is present', () => {
                    let listWithPullLink = _.clone(list);
                    listWithPullLink._links.pull = pullLink;
                    tree.setProps({list: listWithPullLink});
                    tabs = tree.find(Tabs);
                    tab = tabs.find(Tab).at(0);
                    button = tab.find('ListGroupItem').find('[onClick]').find('.refresh');
                    expect(button.length).toBe(1);
                });

                describe('when rendered', () => {
                    beforeEach(() => {
                        let listWithPullLink = _.clone(list);
                        listWithPullLink._links.pull = pullLink;
                        tree.setProps({list: listWithPullLink});
	                    tabs = tree.find(Tabs);
	                    tab = tabs.find(Tab).at(0);
	                    button = tab.find('ListGroupItem').find('[onClick]').find('.refresh');
                    });

                    it('fires pull todos action with pullLink', () => {
                        button.simulate('click');
		                expect(mockPullTodosActionFn).toBeCalledWith(pullLink);
                    });
                });
            });
        });

        describe('second tab', () => {
            let tab;

            beforeEach(() => {
                tab = tabs.find(Tab).at(1);
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
                    tabs = tree.find(Tabs);
                    tab = tabs.find(Tab).at(1);
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
                    tabs = tree.find(Tabs);
                    tab = tabs.find(Tab).at(1);
                });

                it('is not disabled', () => {
                    expect(tab.prop('disabled')).toBe(false);
                });
            });

            describe('title', () => {
                let titleNode;

                beforeEach(() => {
                    titleNode = shallow(tab.prop('title'));
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
                        tree.setProps({list: listWithProps});
                        tabs = tree.find(Tabs);
                        tab = tabs.find(Tab).at(1);
                        titleNode = shallow(tab.prop('title'));
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
            modal = tree.find(Modal).at(0);
        });

        it('renders', () => {
            expect(modal.length).toEqual(1);
        });

        it('has show state matching showUnlockConfirmation', () => {
            tree.setState({showUnlockConfirmation: true});
            modal = tree.find(Modal).at(0);
            expect(modal.prop('show')).toEqual(true);
        });

        describe('when rendered', () => {
            let unlockLink;

            beforeEach(() => {
                tree.setState({showUnlockConfirmation: true});
                let listWithUnlockLink = _.clone(list);
                unlockLink = {href: 'http://some.api/unlock'};
                listWithUnlockLink._links.unlock = unlockLink;
                tree.setProps({list: listWithUnlockLink});
                modal = tree.find(Modal).at(0);
            });

            describe('footer', () => {
                let footer;

                beforeEach(() => {
                    footer = modal.find(Modal.Footer);
                });

                it('renders', () => {
                    expect(footer.length).toEqual(1);
                });

                it('contains 2 buttons', () => {
                    expect(footer.find('Button').length).toEqual(2);
                });

                describe('first button', () => {
                    let button;

                    beforeEach(() => {
                        button = footer.find('Button').at(0);
                    });

                    it('updates showUnlockConfirmation state to false on click', () => {
                        button.simulate('click');
                        expect(tree.state().showUnlockConfirmation).toBe(false)
                    });
                });

                describe('second button', () => {
                    let button;

                    beforeEach(() => {
                        button = footer.find('Button').at(1);
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
    });

    describe('list', () => {
        let listGroup;

        beforeEach(() => {
            listGroup = tree.find('ListGroup');
        });

        it('renders for now and later todos', () => {
            expect(listGroup.length).toBe(2);
        });

        describe('without todos', () => {
            it('does not contain any items', () => {
                expect(listGroup.find('ListGroupItem').length).toBe(0);
            });
        });

        describe('with todos', () => {
            let todo1, todo2, laterTodo1, laterTodo2, deleteLinkOne, listWithProps;

            beforeEach(() => {
                deleteLinkOne = {href: 'http://some.api/deleteTodoOne'};
                todo1 = {task: 'thing one', _links: {delete: deleteLinkOne}};
                todo2 = {task: 'thing two', _links: {delete: {href: 'http://some.api/deleteTodoTwo'}}};
                laterTodo1 = {task: 'later thing one'};
                laterTodo2 = {task: 'later thing two'};
                let todos = [todo1, todo2];
                let laterTodos = [laterTodo1, laterTodo2];
                listWithProps = _.clone(list);
                listWithProps.todos = todos;
                listWithProps.deferredTodos = laterTodos;
                tree.setProps({list: listWithProps});
                listGroup = tree.find('ListGroup');
            });

	        it('contains a Todo for each todo', () => {
	            expect(listGroup.find(Todo).length).toBe(4);
	        });

	        describe('each todo', () => {
	            let todo;

	            beforeEach(() => {
	                todo = listGroup.find(Todo).at(0);
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
                    listGroup = tree.find('ListGroup');
	                todo = listGroup.find(Todo).at(0);
	                expect(todo.prop('readOnly')).toBe(true);
	            });

	            it('has task and links', () => {
	                expect(todo.prop('task')).toEqual('thing one');
	                expect(todo.prop('links')).toEqual({delete: deleteLinkOne});
	            });
	        });
        });
    });

    it('maps state to props', () => {
        let state = {
            todos: {active: [1], inactive: [3]},
            list: {name: 'cool list'},
            links: {
                list: {href: 'http://some.api/list'}
            }
        };

        expect(mapStateToProps(state)).toEqual({
            nowTodos: [1],
            laterTodos: [3],
            list: {name: 'cool list'},
            listLink: {href: 'http://some.api/list'}
        });
    });
});