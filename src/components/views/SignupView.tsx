import _ from 'lodash';
import React, { Component, FormEvent, ChangeEvent } from 'react';
import { Button, Col, ControlLabel, FormControl, FormGroup, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { getBaseResourcesRequestAction, GetBaseResourcesRequestAction } from '../../actions/resourcesActions';
import { signupRequestAction, SignupRequestAction } from '../../actions/sessionActions';
import { Link } from '../../api/api';
import { SignupInfo } from '../../api/session';
import { ApplicationState } from '../../store';
import Header from '../Header';

export interface Props {
    signupLink: Link;
    getBaseResourcesRequestAction(): GetBaseResourcesRequestAction;
    signupRequestAction(link: Link, signupInfo: SignupInfo): SignupRequestAction;
}

export type State = SignupInfo;

export class SignupView extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);

        this.state = {
            email: '',
            password: '',
            passwordConfirmation: '',
        };
    }

    public componentWillMount() {
        if (localStorage.getItem('sessionToken')) {
            browserHistory.push('/');
        }
    }

    public componentDidMount() {
        this.props.getBaseResourcesRequestAction();
    }

    public render() {
        // TODO: Add password strength rules
        return (
            <div>
                <Header />
                <Row>
                    <Col lg={4} lgOffset={4}>
                        <form>
                            <FormGroup controlId="email">
                                <ControlLabel>Email</ControlLabel>
                                <FormControl type="text"
                                    onChange={this.handleChange.bind(this, 'email')} />
                            </FormGroup>
                            <FormGroup controlId="password">
                                <ControlLabel>Password</ControlLabel>
                                <FormControl type="password"
                                    onChange={this.handleChange.bind(this, 'password')} />
                            </FormGroup>
                            <FormGroup controlId="passwordConfirmation"
                                validationState={this.getPasswordConfirmationValidationState()}>
                                <ControlLabel>Password Confirmation</ControlLabel>
                                <FormControl type="password"
                                    onChange={this.handleChange.bind(this, 'passwordConfirmation')} />
                                <FormControl.Feedback />
                            </FormGroup>
                            <Button bsStyle="primary"
                                type="button"
                                onClick={this.handleClick}
                                disabled={this.disableFormSubmit()}>
                                Submit
                            </Button>
                        </form>
                    </Col>
                </Row>
                <Row>
                    <Col lg={4} lgOffset={4}>
                        <div className="leading-link">
                            <div>Already registered?</div>
                            <a href="#" onClick={this.handleLoginClick}>Login</a>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }

    public handleLoginClick() {
        browserHistory.push('/login');
    }

    public handleChange(field: keyof State, event: ChangeEvent<FormControl & HTMLInputElement>) {
        this.setState({
            ...this.state,
            [field]: event.target.value,
        });
    }

    public disableFormSubmit() {
        return !this.enableFormSubmit();
    }

    public enableFormSubmit() {
        return _.every(this.state, (value, key) => {
            return value.length > 0;
        }) && this.passwordIsConfirmed();
    }

    public passwordIsConfirmed() {
        const passwordConfirmation = this.state.passwordConfirmation;
        return passwordConfirmation === this.state.password;
    }

    public getPasswordConfirmationValidationState() {
        const passwordConfirmation = this.state.passwordConfirmation;
        if (passwordConfirmation.length > 0) {
            if (this.passwordIsConfirmed()) {
                return 'success';
            } else {
                return 'error';
            }
        }
    }

    public handleClick() {
        this.props.signupRequestAction(this.props.signupLink, this.state);
    }
}

export const mapStateToProps = (state: ApplicationState) => {
    return {
        signupLink: state.links.signup,
    };
};

export default connect(mapStateToProps, { signupRequestAction, getBaseResourcesRequestAction })(SignupView);
