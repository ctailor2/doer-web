import _ from 'lodash';
import React, { Component, FormEvent } from 'react';
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
    loginLink: Link;
    getBaseResourcesRequestAction(): GetBaseResourcesRequestAction;
    loginRequestAction(link: Link, loginInfo: LoginInfo): LoginRequestAction;
}

export type State = LoginInfo;

export class LoginView extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);

        this.state = {
            email: '',
            password: '',
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
                            <div>Not registered yet?</div>
                            <a href="#" onClick={this.handleSignUpClick}>Sign up</a>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }

    public handleSignUpClick() {
        browserHistory.push('/signup');
    }

    public handleChange(field: keyof State, event: FormEvent<FormControl>) {
        const target = event.target as HTMLInputElement;
        this.setState({
            ...this.state,
            [field]: target.value,
        });
    }

    public disableFormSubmit() {
        return !this.enableFormSubmit();
    }

    public enableFormSubmit() {
        return _.every(this.state, (value, key) => {
            return value.length > 0;
        });
    }

    public handleClick() {
        this.props.loginRequestAction(this.props.loginLink, this.state);
    }
}

export const mapStateToProps = (state: ApplicationState) => {
    return {
        loginLink: state.links.login,
    };
};

export default connect(mapStateToProps, { loginRequestAction, getBaseResourcesRequestAction })(LoginView);
