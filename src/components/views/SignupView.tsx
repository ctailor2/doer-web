import _ from 'lodash';
import React, { ChangeEvent, Component, useEffect, useState } from 'react';
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
    signupLink?: Link;
    getBaseResourcesRequestAction(): GetBaseResourcesRequestAction;
    signupRequestAction(link: Link, signupInfo: SignupInfo): SignupRequestAction;
}

export type State = SignupInfo;

export const SignupView = ({signupLink, getBaseResourcesRequestAction, signupRequestAction}: Props) => {
    const [signupInfo, setSignupInfo] = useState<SignupInfo>({
        email: '',
        password: '',
        passwordConfirmation: '',        
    });

    if (localStorage.getItem('sessionToken')) {
        browserHistory.push('/');
    }

    useEffect(() => {
        if (!signupLink) {
            getBaseResourcesRequestAction();
        }
    });

    const handleLoginClick = () => {
        browserHistory.push('/login');
    }

    const handleChange = (field: keyof State, event: ChangeEvent<FormControl & HTMLInputElement>) => {
        setSignupInfo({
            ...signupInfo,
            [field]: event.target.value,
        });
    }

    const disableFormSubmit = () => {
        return !enableFormSubmit();
    }

    const enableFormSubmit = () => {
        return _.every(signupInfo, (value, key) => {
            return value.length > 0;
        }) && passwordIsConfirmed();
    }

    const passwordIsConfirmed = () => {
        return signupInfo.passwordConfirmation === signupInfo.password;
    }

    const getPasswordConfirmationValidationState = () => {
        if (signupInfo.passwordConfirmation.length > 0) {
            if (passwordIsConfirmed()) {
                return 'success';
            } else {
                return 'error';
            }
        }
    }

    const handleClick = () => {
        signupLink && signupRequestAction(signupLink, signupInfo);
    }

    return (
        <div>
            <Header />
            <Row>
                <Col lg={4} lgOffset={4}>
                    <form>
                        <FormGroup controlId="email">
                            <ControlLabel>Email</ControlLabel>
                            <FormControl type="text"
                                onChange={(e: React.ChangeEvent<FormControl & HTMLInputElement>) => handleChange('email', e)} />
                        </FormGroup>
                        <FormGroup controlId="password">
                            <ControlLabel>Password</ControlLabel>
                            <FormControl type="password"
                                onChange={(e: React.ChangeEvent<FormControl & HTMLInputElement>) => handleChange('password', e)} />
                        </FormGroup>
                        <FormGroup controlId="passwordConfirmation"
                            validationState={getPasswordConfirmationValidationState()}>
                            <ControlLabel>Password Confirmation</ControlLabel>
                            <FormControl type="password"
                                onChange={(e: React.ChangeEvent<FormControl & HTMLInputElement>) => handleChange('passwordConfirmation', e)} />
                            <FormControl.Feedback />
                        </FormGroup>
                        <Button bsStyle="primary"
                            type="button"
                            onClick={handleClick}
                            disabled={disableFormSubmit()}>
                            Submit
                        </Button>
                    </form>
                </Col>
            </Row>
            <Row>
                <Col lg={4} lgOffset={4}>
                    <div className="leading-link">
                        <div>Already registered?</div>
                        <a href="#" onClick={handleLoginClick}>Login</a>
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export const mapStateToProps = (state: ApplicationState) => {
    return {
        signupLink: state.links.signup,
    };
};

export default connect(mapStateToProps, { signupRequestAction, getBaseResourcesRequestAction })(SignupView);
