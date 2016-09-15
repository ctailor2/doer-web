import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Col, FormGroup, ControlLabel, FormControl, Button} from 'react-bootstrap';
import Header from '../Header';
import _ from 'lodash';
import {signupRequestAction} from '../../actions/sessionActions';

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

    render() {
        // TODO: Add password strength rules
        return(
            <div>
                <Header />
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
            </div>
        );
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
        this.props.signupRequestAction(this.state);
    }
}

export default connect(null, {signupRequestAction})(SignupView);