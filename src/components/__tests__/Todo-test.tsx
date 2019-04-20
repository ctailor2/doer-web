import { configure, mount, ReactWrapper, shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React, {  } from 'react';
import { wrapInTestContext } from 'react-dnd-test-utils';
import { Link } from '../../api/api';
import DraggableListGroupItem from '../DraggableListGroupItem';
import { Props, State, Todo } from '../Todo';

describe('Todo', () => {
    let tree: ShallowWrapper;
    let index: number;
    let deleteLink: Link;
    let updateLink: Link;
    let completeLink: Link;
    let mockDeleteTodoActionFn: jest.Mock;
    let mockUpdateTodoActionFn: jest.Mock;
    let mockCompleteTodoActionFn: jest.Mock;
    let mockMoveTodoHandler: jest.Mock;

    beforeEach(() => {
        configure({ adapter: new Adapter() });
        deleteLink = { href: 'http://some.api/deleteTodo' };
        updateLink = { href: 'http://some.api/updateTodo' };
        completeLink = { href: 'http://some.api/completeTodo' };
        index = 17;
        mockDeleteTodoActionFn = jest.fn();
        mockUpdateTodoActionFn = jest.fn();
        mockCompleteTodoActionFn = jest.fn();
        mockMoveTodoHandler = jest.fn();
        tree = shallow(<Todo
            task='some task'
            index={index}
            links={{ delete: deleteLink, update: updateLink, complete: completeLink, move: [] }}
            handleMove={mockMoveTodoHandler}
            updateTodoRequestAction={mockUpdateTodoActionFn}
            completeTodoRequestAction={mockCompleteTodoActionFn}
            deleteTodoRequestAction={mockDeleteTodoActionFn} />);
    });

    it('renders', () => {
        expect(tree.length).toBe(1);
    });

    it('has default state', () => {
        expect(tree.state()).toEqual({ editMode: false, task: 'some task' });
    });

    describe('when readOnly is false', () => {
        let wrappedTree: ReactWrapper;
        let unwrappedTree: ReactWrapper<Props, State, any>;
        let moveLinkOneToTwo: Link;

        beforeEach(() => {
            const TodoWithDndContext = wrapInTestContext(Todo);
            moveLinkOneToTwo = { href: 'http://some.api/moveOneToTwo' };
            wrappedTree = mount(<TodoWithDndContext
                task='some task'
                index={index}
                links={{
                    delete: deleteLink,
                    update: updateLink,
                    complete: completeLink,
                    move: [
                        { href: 'http://some.api/moveOneToSelf' },
                        moveLinkOneToTwo,
                    ],
                }}
                handleMove={mockMoveTodoHandler}
                updateTodoRequestAction={mockUpdateTodoActionFn}
                completeTodoRequestAction={mockCompleteTodoActionFn}
                deleteTodoRequestAction={mockDeleteTodoActionFn} />);
            unwrappedTree = wrappedTree.find(Todo);
        });

        describe('by default', () => {
            describe('DraggableListGroupItem', () => {
                let draggableItem: ReactWrapper;

                beforeEach(() => {
                    draggableItem = unwrappedTree.find(DraggableListGroupItem);
                });

                it('renders', () => {
                    expect(draggableItem.length).toBe(1);
                });

                it('has a matching index', () => {
                    expect(draggableItem.prop('index')).toEqual(index);
                });

                describe('move handler', () => {
                    let moveHandler: (index: number) => void;

                    beforeEach(() => {
                        moveHandler = draggableItem.prop('moveItem');
                    });

                    it('calls the move handler with the matching link', () => {
                        moveHandler(1);
                        expect(mockMoveTodoHandler).toBeCalledWith(moveLinkOneToTwo);
                    });
                });

                describe('checkbox', () => {
                    let checkbox: ReactWrapper;

                    beforeEach(() => {
                        checkbox = draggableItem.find('input[type="checkbox"]');
                    });

                    it('renders', () => {
                        expect(checkbox.length).toBe(1);
                    });

                    it('is unchecked by default', () => {
                        expect(checkbox.prop('checked')).toBe(false);
                    });

                    it('fires complete todo action with completeLink on change', () => {
                        checkbox.simulate('change');
                        expect(mockCompleteTodoActionFn).toBeCalledWith(completeLink);
                    });
                });

                describe('anchor tag', () => {
                    let anchorTag: ReactWrapper;

                    beforeEach(() => {
                        anchorTag = draggableItem.find('a');
                    });

                    it('renders', () => {
                        expect(anchorTag.length).toBe(1);
                    });

                    it('fires delete todo action with deleteLink on click', () => {
                        anchorTag.simulate('click');
                        expect(mockDeleteTodoActionFn).toBeCalledWith(deleteLink);
                    });
                });

                describe('button', () => {
                    let button: ReactWrapper;

                    beforeEach(() => {
                        button = draggableItem.find('Button');
                    });

                    it('renders', () => {
                        expect(button.length).toBe(1);
                    });

                    describe('when clicked', () => {
                        let input: ReactWrapper;

                        beforeEach(() => {
                            button.simulate('click');
                            input = unwrappedTree.instance().taskInput;
                        });

                        it('captures task and toggles editMode on and when clicked', () => {
                            expect(unwrappedTree.instance().state.editMode).toBe(true);
                            expect(unwrappedTree.instance().state.task).toEqual('some task');
                        });

                        it('focuses the input', () => {
                            expect(document.activeElement).toEqual(input);
                        });
                    });
                });
            });
        });

        describe('when in editMode', () => {
            beforeEach(() => {
                unwrappedTree.instance().handleEditClick();
                wrappedTree.update();
                unwrappedTree = wrappedTree.find(Todo);
            });

            describe('form group', () => {
                let formGroup;

                beforeEach(() => {
                    formGroup = unwrappedTree.find('FormGroup');
                });

                it('renders', () => {
                    expect(formGroup.length).toBe(1);
                });
            });

            describe('text input', () => {
                let formControl: ReactWrapper;

                beforeEach(() => {
                    formControl = unwrappedTree.find('FormControl');
                });

                it('renders', () => {
                    expect(formControl.length).toBe(1);
                });

                it('value is the task state by default', () => {
                    expect(formControl.prop('value')).toEqual('some task');
                });

                it('updates task state on change', () => {
                    formControl.simulate('change', { target: { value: 'some other task' } });
                    expect(unwrappedTree.instance().state.task).toEqual('some other task');
                });
            });

            describe('first button', () => {
                let button: ReactWrapper;

                beforeEach(() => {
                    button = unwrappedTree.find('Button').at(0);
                });

                it('renders', () => {
                    expect(button.length).toBe(1);
                });

                it('is disabled by default', () => {
                    expect(button.prop('disabled')).toBe(true);
                });

                it('is enabled when task state is different from task props', () => {
                    unwrappedTree.instance().setState({ task: 'some other task' });
                    wrappedTree.update();
                    unwrappedTree = wrappedTree.find(Todo);
                    button = unwrappedTree.find('Button').at(0);
                    expect(button.prop('disabled')).toBe(false);
                });

                describe('when clicked', () => {
                    beforeEach(() => {
                        unwrappedTree.instance().setState({ task: 'some other task' });
                        button = unwrappedTree.find('Button').at(0);
                        button.simulate('click');
                    });

                    it('fires update todo action with link and task state', () => {
                        expect(mockUpdateTodoActionFn).toBeCalledWith(updateLink, { task: 'some other task' });
                    });

                    it('turns off editMode', () => {
                        expect(unwrappedTree.instance().state.editMode).toBe(false);
                    });
                });
            });

            describe('second button', () => {
                let button: ReactWrapper;

                beforeEach(() => {
                    unwrappedTree.instance().setState({ task: 'some other task' });
                    button = unwrappedTree.find('Button').at(1);
                });

                it('renders', () => {
                    expect(button.length).toBe(1);
                });

                describe('on click', () => {
                    beforeEach(() => {
                        button.simulate('click');
                    });

                    it('turns off editMode', () => {
                        expect(unwrappedTree.instance().state.editMode).toBe(false);
                    });

                    it('resets task state to props', () => {
                        expect(unwrappedTree.instance().state.task).toBe('some task');
                    });
                });
            });
        });
    });
});
