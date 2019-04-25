import React from 'react';
import { Alert, Col, MenuItem, Nav, Navbar, NavDropdown, Row } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import { dismissGlobalAlertAction } from '../../actions/errorActions';
import { logoutRequestAction } from '../../actions/sessionActions';
import { Errors } from '../../api/errors';

interface Props {
    globalErrors: Errors['globalErrors'];
    dismissGlobalAlertAction: typeof dismissGlobalAlertAction;
    logoutRequestAction: typeof logoutRequestAction;
}

// tslint:disable-next-line: no-shadowed-variable
export default ({ globalErrors, dismissGlobalAlertAction, logoutRequestAction }: Props) => (
    <div>
        <Navbar>
            <Navbar.Brand onClick={() => browserHistory.push('/')}>Doer</Navbar.Brand>
            {localStorage.getItem('sessionToken') &&
                <Nav pullRight={true}>
                    <NavDropdown title='Menu' id='header-menu-dropdown'>
                        <MenuItem onClick={() => browserHistory.push('/history')}>History</MenuItem>
                        <MenuItem onClick={logoutRequestAction}>Logout</MenuItem>
                    </NavDropdown>
                </Nav>}
        </Navbar>
        <Row>
            <Col lg={6} lgOffset={3}>
                <div>
                    {globalErrors.map((error, index) => {
                        return (<Alert
                            key={index}
                            onDismiss={() => dismissGlobalAlertAction(index)}
                            bsStyle="danger">{error.message}</Alert>);
                    })}
                </div>
            </Col>
        </Row>
    </div>);
