jest.unmock('../Todo');
jest.unmock('react-bootstrap');

import Todo from '../Todo';
import React from 'react';
import {shallow} from 'enzyme';

describe('Todo', () => {
	let tree, deleteLink, mockDisplaceHandler, mockDeleteHandler;

	beforeEach(() => {
		deleteLink = {href: 'http://some.api/deleteTodo'};
		mockDisplaceHandler = jest.fn();
		mockDeleteHandler = jest.fn();
		tree = shallow(<Todo readOnly={false}
							 task={'some task'}
							 links={{delete: deleteLink}}
							 handleDisplace={mockDisplaceHandler}
							 handleDelete={mockDeleteHandler}/>)
	});

    it('renders', () => {
        expect(tree.length).toBe(1);
    });

	describe('when readOnly is false', () => {
        describe('anchor tag', () => {
            let anchorTag;

            beforeEach(() => {
                anchorTag = tree.find('a');
            });

            it('renders', () => {
                expect(anchorTag.length).toBe(1);
            });

            it('calls handleDelete with deleteLink when clicked', () => {
                anchorTag.simulate('click');
                expect(mockDeleteHandler).toBeCalledWith(deleteLink);
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

                it('calls handleDelete with displaceLink when clicked', () => {
                    button.simulate('click');
                    expect(mockDisplaceHandler).toBeCalledWith(displaceLink);
                });
            });
        });
	});
});
