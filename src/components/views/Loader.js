import React, {Component} from 'react';
import {
	Row,
	Col,
	ProgressBar
} from 'react-bootstrap';

export default class Loader extends Component {
	render() {
		return (<Row>
	        <Col lg={6} lgOffset={3}>
	            <ProgressBar active={true} now={85} />
	        </Col>
	    </Row>);
	}
}
