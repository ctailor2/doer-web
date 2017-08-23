import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Navbar, Nav, NavDropdown, MenuItem} from 'react-bootstrap';
import {logoutRequestAction} from '../actions/sessionActions';
import {browserHistory} from 'react-router';

export class Header extends Component {
    render() {
        return(
            <div>
                <Navbar>
                    <Navbar.Brand onClick={this.handleBrandClick.bind(this)}>Doer</Navbar.Brand>
                    {this.renderNav()}
                </Navbar>
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

export default connect(null, {
	logoutRequestAction
})(Header);