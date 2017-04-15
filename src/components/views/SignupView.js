import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Row, Col, FormGroup, ControlLabel, FormControl, Button} from 'react-bootstrap';
import Header from '../Header';
import _ from 'lodash';
import {signupRequestAction} from '../../actions/sessionActions';
import {getBaseResourcesRequestAction} from '../../actions/resourcesActions'
import {browserHistory} from 'react-router';

export class SignupView extends Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);

        this.state = {
            email: '',
            password: '',
            passwordConfirmation: ''
        };
    }

    componentWillMount() {
        if(localStorage.getItem('sessionToken')) {
            browserHistory.push('/');
        }
    }

    componentDidMount() {
        this.props.getBaseResourcesRequestAction();
    }

    render() {
        // TODO: Add password strength rules
        return(
            <div>
                <Header />
                <Row>
                    <Col lg={4} lgOffset={4}>
                        <form>
                            <FormGroup controlId="email">
                                <ControlLabel>Email</ControlLabel>
                                <FormControl type="text"
                                             onChange={this.handleChange.bind(this, 'email')}/>
                            </FormGroup>
                            <FormGroup controlId="password">
                                <ControlLabel>Password</ControlLabel>
                                <FormControl type="password"
                                             onChange={this.handleChange.bind(this, 'password')}/>
                            </FormGroup>
                            <FormGroup controlId="passwordConfirmation"
                                       validationState={this.getPasswordConfirmationValidationState()}>
                                <ControlLabel>Password Confirmation</ControlLabel>
                                <FormControl type="password"
                                             onChange={this.handleChange.bind(this, 'passwordConfirmation')}/>
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

    handleLoginClick() {
        browserHistory.push('/login');
    }

    handleChange(field, event) {
        let newState = {};
        newState[field] = event.target.value;
        this.setState(newState);
    }

    disableFormSubmit() {
        return !this.enableFormSubmit();
    }

    enableFormSubmit() {
        return _.every(this.state, (value, key) => {
            return value.length > 0;
        }) && this.passwordIsConfirmed();
    }

    passwordIsConfirmed() {
        let passwordConfirmation = this.state.passwordConfirmation;
        return passwordConfirmation === this.state.password;
    }

    getPasswordConfirmationValidationState() {
        let passwordConfirmation = this.state.passwordConfirmation;
        if(passwordConfirmation.length > 0) {
            if(this.passwordIsConfirmed()) {
                return 'success';
            } else {
                return 'error';
            }
        }
    }

    handleClick() {
        this.props.signupRequestAction(this.props.signupLink, this.state);
    }
}

export const mapStateToProps = (state) => {
	return {
		signupLink: state.links.signup
	};
}

export default connect(mapStateToProps, {signupRequestAction, getBaseResourcesRequestAction})(SignupView);