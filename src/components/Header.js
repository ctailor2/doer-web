import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Navbar, Nav, NavDropdown, MenuItem, Row, Col, Alert} from 'react-bootstrap';
import {logoutRequestAction} from '../actions/sessionActions';
import {dismissGlobalAlertAction} from '../actions/errorActions';
import {browserHistory} from 'react-router';

export class Header extends Component {
    render() {
        return(
            <div>
                <Navbar>
                    <Navbar.Brand onClick={this.handleBrandClick.bind(this)}>Doer</Navbar.Brand>
                    {this.renderNav()}
                </Navbar>
                <Row>
                    <Col lg={6} lgOffset={3}>
                        {this.renderGlobalAlerts()}
                    </Col>
                </Row>
            </div>
        );
    }

    renderNav() {
        if(localStorage.getItem('sessionToken')) {
            return(
                <Nav pullRight={true}>
                    <NavDropdown title='Menu' id='header-menu-dropdown'>
                        <MenuItem onClick={this.handleHistoryClick.bind(this)}>History</MenuItem>
                        <MenuItem onClick={this.handleLogoutClick.bind(this)}>Logout</MenuItem>
                    </NavDropdown>
                </Nav>
            );
        }
    }

    renderGlobalAlerts() {
        return(
            <div>
                {this.props.globalErrors.map((error, index) => {
                    return (<Alert key={index}
                                   onDismiss={this.handleAlertDismiss.bind(this, index)}
                                   bsStyle="danger">{error.message}</Alert>);
                })}
            </div>
        );
    }

    handleAlertDismiss(index) {
        this.props.dismissGlobalAlertAction(index);
    }

    handleLogoutClick() {
        this.props.logoutRequestAction();
    }

    handleHistoryClick() {
        browserHistory.push('/history');
    }

    handleBrandClick() {
        browserHistory.push('/');
    }
}

export const mapStateToProps = (state) => {
	return {
		globalErrors: state.errors.globalErrors
	};
}

export default connect(mapStateToProps, {
	logoutRequestAction,
	dismissGlobalAlertAction
})(Header);