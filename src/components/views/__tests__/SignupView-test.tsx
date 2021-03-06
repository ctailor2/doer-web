import { configure, mount, shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PropTypes from 'prop-types';
import React from 'react';
import { browserHistory } from 'react-router';
import { Link } from '../../../api/api';
import Header from '../../Header';
import { mapStateToProps, Props, SignupView, State } from '../SignupView';

describe('SignupView', () => {
    let tree: ShallowWrapper<typeof SignupView>;
    let signupLink: Link;
    let signupRequestActionFn: jest.Mock;
    let getBaseResourcesRequestActionFn: jest.Mock;

    beforeEach(() => {
        configure({ adapter: new Adapter() });
        signupLink = { href: 'http://some.api/signup' };
        signupRequestActionFn = jest.fn();
        getBaseResourcesRequestActionFn = jest.fn();
        tree = shallow(<SignupView
            signupLink={signupLink}
            signupRequestAction={signupRequestActionFn}
            getBaseResourcesRequestAction={getBaseResourcesRequestActionFn} />);
    });

    it('renders', () => {
        expect(tree.length).toBe(1);
    });

    it('has a Header', () => {
        expect(tree.find(Header).length).toBe(1);
    });

    it('fires get base resources action when mounted', () => {
        const store = {
            subscribe: () => null,
            dispatch: () => null,
            getState: () => {
                return { errors: { globalErrors: [] } };
            },
        };
        const options = {
            context: { store },
            childContextTypes: { store: PropTypes.object.isRequired },
        };
        mount(<SignupView
            signupLink={undefined}
            signupRequestAction={signupRequestActionFn}
            getBaseResourcesRequestAction={getBaseResourcesRequestActionFn} />, options);
        expect(getBaseResourcesRequestActionFn).toBeCalled();
    });

    it('redirects to the root if a sessionToken is present', () => {
        localStorage.setItem('sessionToken', 'cooltoken');
        browserHistory.push = jest.fn();
        tree = shallow(<SignupView
            signupLink={signupLink}
            signupRequestAction={signupRequestActionFn}
            getBaseResourcesRequestAction={getBaseResourcesRequestActionFn} />);
        expect(browserHistory.push).toBeCalledWith('/');
    });

    describe('leading link', () => {
        let leadingLink: ShallowWrapper;

        beforeEach(() => {
            leadingLink = tree.find('.leading-link');
        });

        it('renders', () => {
            expect(leadingLink.length).toBe(1);
        });

        it('leads with a question', () => {
            expect(leadingLink.text()).toContain('Already registered?');
        });

        describe('link', () => {
            let link: ShallowWrapper;

            beforeEach(() => {
                browserHistory.push = jest.fn();
                link = leadingLink.find('a');
            });

            it('renders', () => {
                expect(link.length).toBe(1);
            });

            it('links to login', () => {
                expect(link.text()).toBe('Login');
            });

            it('redirects to the login page on click', () => {
                link.simulate('click');
                expect(browserHistory.push).toBeCalledWith('/login');
            });
        });
    });

    describe('form', () => {
        let form: ShallowWrapper;

        beforeEach(() => {
            form = tree.find('form');
        });

        it('renders', () => {
            expect(form.length).toBe(1);
        });

        describe('email form group', () => {
            let formGroup: ShallowWrapper;

            beforeEach(() => {
                formGroup = form.find('FormGroup').at(0);
            });

            it('renders', () => {
                expect(formGroup.length).toBe(1);
            });

            it('has id', () => {
                expect(formGroup.prop('controlId')).toBe('email');
            });

            it('has an Email label', () => {
                const label = formGroup.find('ControlLabel');
                expect(label.length).toBe(1);
                expect(label.childAt(0).text()).toBe('Email');
            });

            describe('text input', () => {
                let input: ShallowWrapper;

                beforeEach(() => {
                    input = formGroup.find('FormControl');
                });

                it('renders', () => {
                    expect(input.length).toBe(1);
                    expect(input.prop('type')).toBe('text');
                });

                it('has no value by default', () => {
                    expect(input.prop('value')).toBeUndefined();
                });
            });
        });

        describe('password form group', () => {
            let formGroup: ShallowWrapper;

            beforeEach(() => {
                formGroup = form.find('FormGroup').at(1);
            });

            it('renders', () => {
                expect(formGroup.length).toBe(1);
            });

            it('has id', () => {
                expect(formGroup.prop('controlId')).toBe('password');
            });

            it('has a Password label', () => {
                const label = formGroup.find('ControlLabel');
                expect(label.length).toBe(1);
                expect(label.childAt(0).text()).toBe('Password');
            });

            describe('password input', () => {
                let input: ShallowWrapper;

                beforeEach(() => {
                    input = formGroup.find('FormControl');
                });

                it('has a password input', () => {
                    expect(input.length).toBe(1);
                    expect(input.prop('type')).toBe('password');
                });
            });
        });

        describe('password confirmation form group', () => {
            let formGroup: ShallowWrapper;

            beforeEach(() => {
                formGroup = form.find('FormGroup').at(2);
            });

            it('renders', () => {
                expect(formGroup.length).toBe(1);
            });

            it('has id', () => {
                expect(formGroup.prop('controlId')).toBe('passwordConfirmation');
            });

            it('has a Password Confirmation label', () => {
                const label = formGroup.find('ControlLabel');
                expect(label.length).toBe(1);
                expect(label.childAt(0).text()).toBe('Password Confirmation');
            });

            describe('password input', () => {
                let input: ShallowWrapper;

                beforeEach(() => {
                    input = formGroup.find('FormControl');
                });

                it('renders', () => {
                    expect(input.length).toBe(1);
                    expect(input.prop('type')).toBe('password');
                });
            });

            it('shows feedback', () => {
                const feedback = formGroup.find('FormControlFeedback');
                expect(feedback.length).toBe(1);
            });

            it('has no validation state by default', () => {
                expect(formGroup.prop('validationState')).toBeUndefined();
            });

            describe('when data is entered', () => {
                it('has success validation state when entry matches password', () => {
                    const passwordInput = tree.find('FormGroup').at(1).find('FormControl');
                    passwordInput.simulate('change', { target: { value: 'bananas' } });
                    const passwordConfirmationInput = tree.find('FormGroup').at(2).find('FormControl');
                    passwordConfirmationInput.simulate('change', { target: { value: 'bananas' } });
                    formGroup = tree.find('FormGroup').at(2);
                    expect(formGroup.prop('validationState')).toBe('success');
                });

                it('has error validation state when entry does not match password', () => {
                    const passwordConfirmationInput = tree.find('FormGroup').at(2).find('FormControl');
                    passwordConfirmationInput.simulate('change', { target: { value: 'bananas' } });
                    formGroup = tree.find('FormGroup').at(2);
                    expect(formGroup.prop('validationState')).toBe('error');
                });
            });
        });

        describe('submit button', () => {
            let button: ShallowWrapper;

            beforeEach(() => {
                button = form.find('Button');
            });

            it('renders', () => {
                expect(button.length).toBe(1);
                expect(button.childAt(0).text()).toBe('Submit');
                expect(button.prop('type')).toBe('button');
                expect(button.prop('bsStyle')).toBe('primary');
            });

            it('is disabled by default', () => {
                expect(button.prop('disabled')).toBe(true);
            });

            describe('when all fields are entered', () => {
                it('stays disabled if password confirmation does not match password ', () => {
                    const emailInput = tree.find('FormGroup').at(0).find('FormControl');
                    emailInput.simulate('change', { target: { value: 'email' } });
                    const passwordInput = tree.find('FormGroup').at(1).find('FormControl');
                    passwordInput.simulate('change', { target: { value: 'password' } });
                    const passwordConfirmationInput = tree.find('FormGroup').at(2).find('FormControl');
                    passwordConfirmationInput.simulate('change', { target: { value: 'passwordConfirmation' } });
                    button = tree.find('Button');
                    expect(button.prop('disabled')).toBe(true);
                });

                it('enables if password confirmation matches password ', () => {
                    const emailInput = tree.find('FormGroup').at(0).find('FormControl');
                    emailInput.simulate('change', { target: { value: 'email' } });
                    const passwordInput = tree.find('FormGroup').at(1).find('FormControl');
                    passwordInput.simulate('change', { target: { value: 'password' } });
                    const passwordConfirmationInput = tree.find('FormGroup').at(2).find('FormControl');
                    passwordConfirmationInput.simulate('change', { target: { value: 'password' } });
                    button = tree.find('Button');
                    expect(button.prop('disabled')).toBe(false);
                });
            });

            it('fires signup request action with form data and signup link on click', () => {
                const emailInput = tree.find('FormGroup').at(0).find('FormControl');
                emailInput.simulate('change', { target: { value: 'test@email.com' } });
                const passwordInput = tree.find('FormGroup').at(1).find('FormControl');
                passwordInput.simulate('change', { target: { value: 'password' } });
                const passwordConfirmationInput = tree.find('FormGroup').at(2).find('FormControl');
                passwordConfirmationInput.simulate('change', { target: { value: 'password' } });
                button = tree.find('Button');
                button.simulate('click');
                expect(signupRequestActionFn).toBeCalledWith(signupLink, {
                    email: 'test@email.com',
                    password: 'password',
                    passwordConfirmation: 'password'
                });
            });
        });
    });

    it('maps state to props', () => {
        const mySignupLink = { href: 'http://some.api/signup' };
        const links = { signup: mySignupLink, login: { href: 'http://some.api/login' } };
        const state = {
            links,
            list: { listAndLink: null, selectedList: null },
            completedList: null,
            errors: {
                fieldErrors: [],
                globalErrors: [],
            },
            listOptions: [],
        };
        expect(mapStateToProps(state)).toEqual({
            signupLink: mySignupLink,
        });
    });
});
