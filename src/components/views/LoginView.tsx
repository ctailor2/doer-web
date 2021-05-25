import _ from 'lodash';
import React, { FormEvent, useEffect } from 'react';
import { Button, Col, ControlLabel, FormControl, FormGroup, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { getBaseResourcesRequestAction, GetBaseResourcesRequestAction } from '../../actions/resourcesActions';
import { loginRequestAction, LoginRequestAction } from '../../actions/sessionActions';
import { Link } from '../../api/api';
import { LoginInfo } from '../../api/session';
import { ApplicationState } from '../../store';
import Header from '../Header';

export interface Props {
    loginLink?: Link;
    getBaseResourcesRequestAction(): GetBaseResourcesRequestAction;
    loginRequestAction(link: Link, loginInfo: LoginInfo): LoginRequestAction;
}

export const LoginView = ({loginLink, getBaseResourcesRequestAction, loginRequestAction}: Props) => {
    const [loginInfo, setLoginInfo] = React.useState<LoginInfo>({email: '', password: ''});

    if (localStorage.getItem('sessionToken')) {
        browserHistory.push('/');
    }

    useEffect(() => {
        if (!loginLink) {
            getBaseResourcesRequestAction();
        }
    });

    const handleSignUpClick = () => {
        browserHistory.push('/signup');
    }

    const handleChange = (field: keyof LoginInfo, event: FormEvent<FormControl>) => {
        const target = event.target as HTMLInputElement;
        const newValueToSet = {
            ...loginInfo,
            [field]: target.value,
        };
        setLoginInfo(newValueToSet);
    }

    const disableFormSubmit = () => {
        return !enableFormSubmit();
    }

    const enableFormSubmit = () => {
        return _.every(loginInfo, (value, key) => {
            return value.length > 0;
        });
    }

    const handleClick = () => {
        loginLink && loginRequestAction(loginLink, loginInfo);
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
                                onChange={(e) => handleChange('email', e)} />
                        </FormGroup>
                        <FormGroup controlId="password">
                            <ControlLabel>Password</ControlLabel>
                            <FormControl type="password"
                                onChange={(e) => handleChange('password', e)} />
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
                        <div>Not registered yet?</div>
                        <a href="#" onClick={handleSignUpClick}>Sign up</a>
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export const mapStateToProps = (state: ApplicationState) => {
    return {
        loginLink: state.links.login,
    };
};

export default connect(mapStateToProps, { loginRequestAction, getBaseResourcesRequestAction })(LoginView);
