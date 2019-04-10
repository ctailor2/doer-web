import React from 'react';
import {shallow, configure} from 'enzyme';
import {Header, mapStateToProps} from '../Header';
import {Navbar, Nav, NavDropdown} from 'react-bootstrap';
import {browserHistory} from 'react-router';
import Adapter from 'enzyme-adapter-react-16';

describe('Header', () => {
    let tree, globalErrors, dismissGlobalAlertActionFn, logoutRequestActionFn;

    beforeEach(() => {
        configure({ adapter: new Adapter() });
        logoutRequestActionFn = jest.fn();
        dismissGlobalAlertActionFn = jest.fn();
        globalErrors = []
        tree = shallow(<Header globalErrors={globalErrors}
                               dismissGlobalAlertAction={dismissGlobalAlertActionFn}
                               logoutRequestAction={logoutRequestActionFn}/>);
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

        describe('brand', () => {
            let brand;

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
        let alert;

        beforeEach(() => {
            alert = tree.find('Alert');
        });

        it('does not render by default', () => {
            expect(alert.length).toBe(0);
        });

        describe('when there are global errors', () => {
            let message;

            beforeEach(() => {
                message = "Oh snap, something went wrong!"
                tree.setProps({
                    globalErrors: [
                        {message: message}
                    ]
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
                let handler;

                beforeEach(() => {
                    handler = alert.prop('onDismiss')
                });

                it('fires dismiss global alert action with its index', () => {
                    handler();
                    expect(dismissGlobalAlertActionFn).toBeCalledWith(0);
                });
            });
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
                localStorage.setItem('sessionToken', 'cooltoken');
                // Calling update wasn't re-rendering
                tree = shallow(<Header globalErrors={globalErrors} logoutRequestAction={logoutRequestActionFn}/>);
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

    it('maps state to props', () => {
        let state = {
            errors: {
                fieldErrors: [1],
                globalErrors: [2]
            }
        };

        expect(mapStateToProps(state)).toEqual({
            globalErrors: [2]
        });
    });
});
