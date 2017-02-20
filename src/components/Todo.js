import React, { Component } from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import {
	Row,
	Col,
	Button,
	Glyphicon,
} from 'react-bootstrap';

export default class Todo extends Component {
	canBeDisplaced() {
		return this.props.readOnly && !_.isUndefined(this.props.links.displace);
	}

	render() {
		if(this.canBeDisplaced()) {
		    return (<Row>
		            <Col lg={1}><Button className="icon-button" bsStyle="primary" type="button" bsSize="xsmall" onClick={this.props.handleDisplace.bind(this, this.props.links.displace)}><Glyphicon glyph="menu-right"/></Button></Col>
		            <Col lg={11}>{this.props.task}</Col>
		        </Row>);
		} else {
	        return (<Row>
	                <Col lg={11}>{this.props.task}</Col>
	                <Col lg={1}><a className="icon-button" onClick={this.props.handleDelete.bind(this, this.props.links.delete)}><Glyphicon glyph="remove"/></a></Col>
	            </Row>);
		}
	}
}