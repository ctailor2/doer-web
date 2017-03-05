jest.unmock('../Header');

import React from 'react';
import {shallow} from 'enzyme';
import {Header} from '../Header';
import {Navbar, Brand, Nav, NavDropdown} from 'react-bootstrap';
import {browserHistory} from 'react-router';

describe('Header', () => {
    let tree, logoutRequestActionFn;

    beforeEach(() => {
        logoutRequestActionFn = jest.fn();
        localStorage.getItem = jest.fn();
        tree = shallow(<Header logoutRequestAction={logoutRequestActionFn}/>);
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

    describe('Nav', () => {
        let nav;

        beforeEach(() => {
            nav = tree.find(Nav);
        });

        it('does not render by default', () => {
            expect(nav.length).toBe(0);
        });

        describe('when localStorage contains a session token', () => {
            beforeEach(() => {
                localStorage.getItem = jest.fn(() => {return 'cooltoken'});
                // Calling update wasn't re-rendering
                tree = shallow(<Header logoutRequestAction={logoutRequestActionFn}/>);
                nav = tree.find(Nav);
            });

            it('renders', () => {
                expect(nav.length).toBe(1);
            });

            describe('dropdown', () => {
                let dropdown;

                beforeEach(() => {
                    dropdown = nav.find(NavDropdown);
                });

                it('renders', () => {
                    expect(dropdown.length).toBe(1);
                });

                it('has title', () => {
                    expect(dropdown.prop('title')).toBe('Menu');
                });

                describe('history option', () => {
                    let historyOption;

                    beforeEach(() => {
                        historyOption = dropdown.childAt(0);
                    });

                    it('renders', () => {
                        expect(historyOption.length).toBe(1);
                    });

                    it('is for history', () => {
                        expect(historyOption.childAt(0).text()).toBe('History');
                    });

                    it('navigates to history', () => {
                        browserHistory.push = jest.fn();
                        historyOption.simulate('click');
                        expect(browserHistory.push).toBeCalledWith('/history');
                    });
                });

                describe('logout option', () => {
                    let logoutOption;

                    beforeEach(() => {
                        logoutOption = dropdown.childAt(1);
                    });

                    it('renders', () => {
                        expect(logoutOption.length).toBe(1);
                    });

                    it('is for logout', () => {
                        expect(logoutOption.childAt(0).text()).toBe('Logout');
                    });

                    it('fires logout request action on click', () => {
                        logoutOption.simulate('click');
                        expect(logoutRequestActionFn).toBeCalled();
                    });
                });
            });
        });
    });
});
