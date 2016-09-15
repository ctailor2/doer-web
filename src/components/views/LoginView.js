import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Col, FormGroup, ControlLabel, FormControl, Button} from 'react-bootstrap';
import Header from '../Header';
import _ from 'lodash';
import {loginRequestAction} from '../../actions/sessionActions';

export class LoginView extends Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);

        this.state = {
            email: '',
            password: ''
        };
    }

    render() {
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
        });
    }

    handleClick() {
        this.props.loginRequestAction(this.state);
    }
}

export default connect(null, {loginRequestAction})(LoginView);