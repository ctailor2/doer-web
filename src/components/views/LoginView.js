import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Row, Col, FormGroup, ControlLabel, FormControl, Button} from 'react-bootstrap';
import Header from '../Header';
import _ from 'lodash';
import {loginRequestAction} from '../../actions/sessionActions';
import {browserHistory} from 'react-router';
import {getBaseResourcesRequestAction} from '../../actions/baseResourcesActions'

export class LoginView extends Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);

        this.state = {
            email: '',
            password: ''
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

    handleSignUpClick() {
        browserHistory.push('/signup');
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
        this.props.loginRequestAction(this.props.loginLink, this.state);
    }
}

export const mapStateToProps = (state) => {
	return {
		loginLink: state.links.login
	};
}

export default connect(mapStateToProps, {loginRequestAction, getBaseResourcesRequestAction})(LoginView);