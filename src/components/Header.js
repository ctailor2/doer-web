import React, { Component } from 'react';
import {Navbar, Brand} from 'react-bootstrap';

export default class Header extends Component {
    render() {
        return(
            <div>
                <Navbar>
                    <Navbar.Brand>Doer</Navbar.Brand>
                </Navbar>
            </div>
        );
    }
}