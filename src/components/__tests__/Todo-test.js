jest.unmock('../Todo');

import {Todo} from '../Todo';
import React from 'react';
import {mount} from 'enzyme';

describe('Todo', () => {
	let tree, deleteLink, updateLink, completeLink, mockDisplaceHandler, mockDeleteTodoActionFn, mockUpdateTodoActionFn, mockCompleteTodoActionFn;

	beforeEach(() => {
		deleteLink = {href: 'http://some.api/deleteTodo'};
		updateLink = {href: 'http://some.api/updateTodo'};
		completeLink = {href: 'http://some.api/completeTodo'};
		mockDisplaceHandler = jest.fn();
		mockDeleteTodoActionFn = jest.fn();
		mockUpdateTodoActionFn = jest.fn();
		mockCompleteTodoActionFn = jest.fn();
		tree = mount(<Todo readOnly={false}
							 task='some task'
							 links={{delete: deleteLink, update: updateLink, complete: completeLink}}
							 handleDisplace={mockDisplaceHandler}
                             updateTodoRequestAction={mockUpdateTodoActionFn}
                             completeTodoRequestAction={mockCompleteTodoActionFn}
                             deleteTodoRequestAction={mockDeleteTodoActionFn}/>)
	});

    it('renders', () => {
        expect(tree.length).toBe(1);
    });

    it('has default state', () => {
        expect(tree.state()).toEqual({editMode: false, task: 'some task'});
    });

	describe('when readOnly is false', () => {
		describe('by default', () => {
			describe('checkbox', () => {
				let checkbox;

				beforeEach(() => {
					checkbox = tree.find('input[type="checkbox"]');
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
	            let anchorTag;

	            beforeEach(() => {
	                anchorTag = tree.find('a');
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
	            let button;

	            beforeEach(() => {
	                button = tree.find('Button');
	            });

	            it('renders', () => {
	                expect(button.length).toBe(1);
	            });

	            describe('when clicked', () => {
	                let input;

	                beforeEach(() => {
						button.simulate('click');
				        input = tree.node.taskInput;
	                });

		            it('toggles editMode on when clicked', () => {
						expect(tree.state().editMode).toBe(true);
		            });

		            it('focuses the input', () => {
						expect(document.activeElement).toEqual(input);
		            });
	            });
	        });
		});

		describe('when in editMode', () => {
			beforeEach(() => {
				tree.setState({editMode: true});
			});

			describe('form group', () => {
				let formGroup;

				beforeEach(() => {
					formGroup = tree.find('FormGroup');
				});

				it('renders', () => {
					expect(formGroup.length).toBe(1);
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

				it('value is the task state by default', () => {
					expect(formControl.prop('value')).toEqual('some task');
				});

				it('updates task state on change', () => {
					formControl.simulate('change', {target: {value: 'some other task'}});
					expect(tree.state().task).toEqual('some other task');
				});
			});

			describe('first button', () => {
				let button;

				beforeEach(() => {
					button = tree.find('Button').at(0);
				});

				it('renders', () => {
					expect(button.length).toBe(1);
				});

				it('is disabled by default', () => {
					expect(button.prop('disabled')).toBe(true);
				});

				it('is enabled when task state is different from task props', () => {
					tree.setState({task: 'some other task'});
					button = tree.find('Button').at(0);
					expect(button.prop('disabled')).toBe(false);
				});

				describe('when clicked', () => {
					beforeEach(() => {
						tree.setState({task: 'some other task'});
						button = tree.find('Button').at(0);
						button.simulate('click');
					});

					it('fires update todo action with link and task state', () => {
						expect(mockUpdateTodoActionFn).toBeCalledWith(updateLink, {task: 'some other task'});
					});

					it('turns off editMode', () => {
						expect(tree.state().editMode).toBe(false);
					});
				});
			});

			describe('second button', () => {
				let button;

				beforeEach(() => {
					tree.setState({task: 'some other task'});
					button = tree.find('Button').at(1);
				});

				it('renders', () => {
					expect(button.length).toBe(1);
				});

				describe('on click', () => {
					beforeEach(() => {
						button.simulate('click');
					});

					it('turns off editMode', () => {
						expect(tree.state().editMode).toBe(false);
					});

					it('resets task state to props', () => {
						expect(tree.state().task).toBe('some task');
					});
				});
			});
		});
	});

	describe('when readOnly is true', () => {
		beforeEach(() => {
			tree.setProps({readOnly: true});
		});

		describe('when the displace link is present', () => {
            let displaceLink = {href: 'http://some.api/displaceTodo'};

            beforeEach(() => {
                tree.setProps({links: {delete: deleteLink, displace: displaceLink}});
            });

            describe('button', () => {
                let button;

                beforeEach(() => {
                     button = tree.find('Button');
                });

	            it('renders', () => {
	                expect(button.length).toBe(1);
	            });

                it('calls handleDisplace with displaceLink when clicked', () => {
                    button.simulate('click');
                    expect(mockDisplaceHandler).toBeCalledWith(displaceLink);
                });
            });
        });
	});
});
