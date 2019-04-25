import { configure, shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React, { Component } from 'react';
import { Nav, Navbar, NavDropdown, NavDropdownProps } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import { GlobalError } from '../../../api/errors';
import { mapStateToProps } from "../connector";
import Header from '../Header';

describe('Header', () => {
    let tree: ShallowWrapper;
    let globalErrors: GlobalError[];
    let dismissGlobalAlertActionFn: jest.Mock;
    let logoutRequestActionFn: jest.Mock;

    beforeEach(() => {
        configure({ adapter: new Adapter() });
        logoutRequestActionFn = jest.fn();
        dismissGlobalAlertActionFn = jest.fn();
        globalErrors = [];
        tree = shallow(<Header globalErrors={globalErrors}
            dismissGlobalAlertAction={dismissGlobalAlertActionFn}
            logoutRequestAction={logoutRequestActionFn} />);
    });

    it('renders', () => {
        expect(tree.length).toBe(1);
    });

    describe('Navbar', () => {
        let navbar: ShallowWrapper;

        beforeEach(() => {
            navbar = tree.find(Navbar);
        });

        it('renders', () => {
            expect(navbar.length).toBe(1);
        });

        describe('brand', () => {
            let brand: ShallowWrapper;

            beforeEach(() => {
                brand = navbar.find(Navbar.Brand);
            });

            it('renders', () => {
                expect(brand.length).toBe(1);
            });

            it('navigates to home on click', () => {
                browserHistory.push = jest.fn();
                brand.simulate('click');
                expect(browserHistory.push).toBeCalledWith('/');
            });
        });
    });

    describe('Alert', () => {
        let alert: ShallowWrapper;

        beforeEach(() => {
            alert = tree.find('Alert');
        });

        it('does not render by default', () => {
            expect(alert.length).toBe(0);
        });

        describe('when there are global errors', () => {
            let message: string;

            beforeEach(() => {
                message = "Oh snap, something went wrong!";
                tree.setProps({
                    globalErrors: [
                        { message },
                    ],
                });
                alert = tree.find('Alert');
            });

            it('renders', () => {
                expect(alert.length).toBe(1);
            });

            it('contains the message', () => {
                expect(alert.childAt(0).text()).toBe(message);
            });

            describe('onDismiss handler', () => {
                let handler: () => void;

                beforeEach(() => {
                    handler = alert.prop('onDismiss');
                });

                it('fires dismiss global alert action with its index', () => {
                    handler();
                    expect(dismissGlobalAlertActionFn).toBeCalledWith(0);
                });
            });
        });
    });

    describe('Nav', () => {
        let nav: ShallowWrapper;

        beforeEach(() => {
            nav = tree.find(Nav);
        });

        it('does not render by default', () => {
            expect(nav.length).toBe(0);
        });

        describe('when localStorage contains a session token', () => {
            beforeEach(() => {
                localStorage.setItem('sessionToken', 'cooltoken');
                // Calling update wasn't re-rendering
                tree = shallow(<Header
                    globalErrors={globalErrors}
                    logoutRequestAction={logoutRequestActionFn}
                    dismissGlobalAlertAction={dismissGlobalAlertActionFn} />);
                nav = tree.find(Nav);
            });

            it('renders', () => {
                expect(nav.length).toBe(1);
            });

            describe('dropdown', () => {
                let dropdown: ShallowWrapper<NavDropdownProps, any, Component<{}, {}, any>>;

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
                    let historyOption: ShallowWrapper;

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
                    let logoutOption: ShallowWrapper;

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
