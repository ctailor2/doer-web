import { configure, shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { Button, DropdownButton, FormControl, MenuItem, Modal } from 'react-bootstrap';
import { Link } from '../../../api/api';
import { List, ListOption } from '../../../api/list';
import ListSelector from '../ListSelector';

describe('ListSelector', () => {
    let list: List;
    let tree: ShallowWrapper<any>;
    let mockCreateListActionFn: jest.Mock;
    let createListLink: Link;
    let listOption: ListOption;
    let otherListOption: ListOption;

    beforeEach(() => {
        configure({ adapter: new Adapter() });
        list = {
            profileName: 'someListName',
            name: 'someName',
            deferredName: 'someDeferredName',
            todos: [],
            deferredTodos: [],
            unlockDuration: 0,
            _links: {
                createDeferred: { href: 'createdDeferredLink' },
            },
        };
        mockCreateListActionFn = jest.fn();
        createListLink = { href: 'createListLink' };
        listOption = { name: 'someListName' };
        otherListOption = { name: 'someOtherListName' };
        tree = shallow(<ListSelector
            listOptions={[listOption, otherListOption]}
            selectedList={list}
            createListLink={createListLink}
            createListAction={mockCreateListActionFn} />);
    });

    describe('DropdownButton', () => {
        let dropdownButton: ShallowWrapper<any>;

        beforeEach(() => {
            dropdownButton = tree.find(DropdownButton);
        });

        it('renders', () => {
            expect(dropdownButton.exists()).toBe(true);
        });

        describe('menu item to create a new list', () => {
            let createNewList: ShallowWrapper<any>;

            beforeEach(() => {
                createNewList = dropdownButton
                    .find(MenuItem)
                    .findWhere((menuItem) => {
                        return menuItem.children()
                            .reduce((contents, element) => contents += element.text(), '')
                            .includes('New List');
                    });
            });

            it('exists', () => {
                expect(createNewList.exists()).toBe(true);
            });

            describe('modal', () => {
                let modal: ShallowWrapper<any>;

                beforeEach(() => {
                    modal = tree.find(Modal);
                });

                it('renders', () => {
                    expect(modal.exists()).toBe(true);
                });

                it('is not shown by default', () => {
                    expect(modal.prop('show')).toBe(false);
                });

                describe('when menu item to create a new list is clicked', () => {
                    beforeEach(() => {
                        createNewList.simulate('click');
                        modal = tree.find(Modal);
                    });

                    it('is shown', () => {
                        expect(modal.prop('show')).toBe(true);
                    });
                });

                describe('when shown', () => {
                    let input: ShallowWrapper<any>;

                    beforeEach(() => {
                        createNewList.simulate('click');
                        modal = tree.find(Modal);
                        input = modal.find(FormControl).find('[type="text"]');
                    });

                    it('has a text input', () => {
                        expect(input.exists()).toBe(true);
                    });

                    it('is hidden on hide', () => {
                        modal.simulate('hide');

                        modal = tree.find(Modal);
                        expect(modal.prop('show')).toBe(false);
                    });

                    describe('button', () => {
                        let button: ShallowWrapper<any>;

                        beforeEach(() => {
                            button = modal.find(Button);
                        });

                        it('renders', () => {
                            expect(button.exists()).toBe(true);
                        });

                        it('is disabled by default', () => {
                            expect(button.prop('disabled')).toBe(true);
                        });

                        describe('when text input has content', () => {
                            it('is enabled when the content is non empty', () => {
                                input.simulate('change', { target: { value: 'something' } });
                                button = tree.find(Modal).find(Button);

                                expect(button.prop('disabled')).toBe(false);
                            });

                            it('is disabled when the content is empty', () => {
                                input.simulate('change', { target: { value: '  ' } });
                                button = tree.find(Modal).find(Button);

                                expect(button.prop('disabled')).toBe(true);
                            });
                        });

                        describe('on click', () => {
                            beforeEach(() => {
                                input.simulate('change', { target: { value: 'something' } });
                                button = tree.find(Modal).find(Button);
                                button.simulate('click');
                            });

                            it('fires a create list action with createListLink', () => {
                                expect(mockCreateListActionFn).toHaveBeenCalledWith(
                                    createListLink,
                                    { name: 'something' });
                            });

                            it('hides the modal', () => {
                                modal = tree.find(Modal);

                                expect(modal.prop('show')).toBe(false);
                            });
                        });
                    });
                });
            });
        });

        it('includes an additional menu item for each list option', () => {
            const allMenuItems = dropdownButton.find(MenuItem);
            expect(allMenuItems.length).toBe(3);
        });

        describe('menu item for each list item', () => {
            let menuItem: ShallowWrapper<any>;

            beforeEach(() => {
                menuItem = dropdownButton.find(MenuItem).at(0);
            });

            it('matches the list option name', () => {
                expect(menuItem.childAt(0).text()).toEqual(listOption.name);
            });

        });

        it('is marks the menuItem matching the selected list as active', () => {
            expect(dropdownButton.find(MenuItem).at(0).prop('active')).toBe(true);
            expect(dropdownButton.find(MenuItem).at(1).prop('active')).toBe(false);
        });
    });
});
