jest.unmock('../Header');

import React from 'react';
import {shallow} from 'enzyme';
import Header from '../Header';
import {Navbar, Brand} from 'react-bootstrap';

describe('Header', () => {
    let tree;

    beforeEach(() => {
        tree = shallow(<Header />);
    });

    it('renders', () => {
        expect(tree.length).toBe(1);
    });

    describe('Navbar', () => {
        let navbar;

        beforeEach(() => {
            navbar = tree.find(Navbar);
        });

        it('renders', () => {
            expect(navbar.length).toBe(1);
        });

        it('has brand', () => {
            let brand = navbar.find(Navbar.Brand);
            expect(brand.length).toBe(1);
            expect(brand.childAt(0).text()).toBe('Doer');
        });
    });
});