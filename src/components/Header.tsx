import React, { Component } from 'react';
import { Alert, Col, MenuItem, Nav, Navbar, NavDropdown, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { dismissGlobalAlertAction, DismissGlobalAlertAction } from '../actions/errorActions';
import { logoutRequestAction, LogoutRequestAction } from '../actions/sessionActions';
import { Errors } from '../api/errors';
import { ApplicationState } from '../store';

interface Props {
    globalErrors: Errors['globalErrors'];
    dismissGlobalAlertAction: typeof dismissGlobalAlertAction;
    logoutRequestAction: typeof logoutRequestAction;
}

export class Header extends Component<Props> {
    public render() {
        return (
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

    public renderNav() {
        if (localStorage.getItem('sessionToken')) {
            return (
                <Nav pullRight={true}>
                    <NavDropdown title='Menu' id='header-menu-dropdown'>
                        <MenuItem onClick={this.handleHistoryClick.bind(this)}>History</MenuItem>
                        <MenuItem onClick={this.handleLogoutClick.bind(this)}>Logout</MenuItem>
                    </NavDropdown>
                </Nav>
            );
        }
    }

    public renderGlobalAlerts() {
        return (
            <div>
                {this.props.globalErrors.map((error, index) => {
                    return (<Alert key={index}
                        onDismiss={this.handleAlertDismiss.bind(this, index)}
                        bsStyle="danger">{error.message}</Alert>);
                })}
            </div>
        );
    }

    public handleAlertDismiss(index: number) {
        this.props.dismissGlobalAlertAction(index);
    }

    public handleLogoutClick() {
        this.props.logoutRequestAction();
    }

    public handleHistoryClick() {
        browserHistory.push('/history');
    }

    public handleBrandClick() {
        browserHistory.push('/');
    }
}

export const mapStateToProps = (state: ApplicationState) => {
    return {
        globalErrors: state.errors.globalErrors,
    };
};

export default connect(mapStateToProps, {
    logoutRequestAction,
    dismissGlobalAlertAction,
})(Header);
