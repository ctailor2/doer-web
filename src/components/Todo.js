import React, { Component } from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import {
	Row,
	Col,
	Button,
	Glyphicon,
	FormControl,
	FormGroup,
	InputGroup,
	ListGroupItem
} from 'react-bootstrap';
import {updateTodoRequestAction, deleteTodoRequestAction, completeTodoRequestAction} from '../actions/todoActions';
import DraggableListGroupItem from './DraggableListGroupItem';

export class Todo extends Component {
	constructor(props) {
		super(props)
		this.state = {editMode: false, task: this.props.task};
	}

	canBeDisplaced() {
		return this.props.readOnly && !_.isUndefined(this.props.links.displace);
	}

	handleEditClick() {
		this.setState({editMode: true});
	}

	render() {
		if(this.canBeDisplaced()) {
			return this.displaceableTodo();
		} else {
			return this.editableTodo();
		}
	}

	displaceableTodo() {
	    return (<ListGroupItem>
		    <Row>
	            <Col lg={1} xs={1}><Button className="icon-button" bsStyle="primary" type="button" bsSize="xsmall" onClick={this.callDisplaceHandler.bind(this)}><Glyphicon glyph="menu-right"/></Button></Col>
	            <Col lg={11} xs={11}>{this.props.task}</Col>
	        </Row>
        </ListGroupItem>);
	}

	componentDidUpdate() {
		if(this.state.editMode) {
			this.taskInput.focus();
		}
	}

	handleChange(event) {
		this.setState({task: event.target.value});
	}

	handleEditCancel() {
		this.setState({editMode: false});
		this.setState({task: this.props.task});
	}

	saveButtonDisabled() {
		return this.state.task === this.props.task;
	}

	handleSave() {
		this.props.updateTodoRequestAction(this.props.links.update, {task: this.state.task});
		this.setState({editMode: false});
	}

	editableTodo() {
		if(this.state.editMode) {
            return (<ListGroupItem>
	            <Row>
	                <Col lg={12}>
	                    <FormGroup bsSize="small">
	                        <InputGroup>
				                <FormControl type="text"
	                                         inputRef={ref => { this.taskInput = ref; }}
				                             value={this.state.task}
				                             onChange={this.handleChange.bind(this)}/>
				                <InputGroup.Button>
				                    <Button type="button" bsSize="small" bsStyle="primary" onClick={this.handleSave.bind(this)} disabled={this.saveButtonDisabled()}>Save</Button>
				                    <Button type="button" bsSize="small" bsStyle="danger" onClick={this.handleEditCancel.bind(this)}>Cancel</Button>
				                </InputGroup.Button>
							</InputGroup>
			            </FormGroup>
	                </Col>
	            </Row>
            </ListGroupItem>);
        } else {
            return (<DraggableListGroupItem index={this.props.index} moveItem={this.handleMove.bind(this)}>
	            <Row>
	                <Col lg={1} xs={1}><input type="checkbox"
	                                   checked={false}
	                                   onChange={this.handleComplete.bind(this)}/></Col>
	                <Col lg={9} xs={9}>{this.props.task}</Col>
	                <Col lg={1} xs={1}><Button className="icon-button" bsStyle="primary" type="button" bsSize="xsmall" onClick={this.handleEditClick.bind(this)}><Glyphicon glyph="pencil"/></Button></Col>
	                <Col lg={1} xs={1}><a className="icon-button" onClick={this.handleDelete.bind(this)}><Glyphicon glyph="remove"/></a></Col>
	            </Row>
            </DraggableListGroupItem>);
        }
	}

	handleMove(toIndex) {
		this.props.handleMove(this.props.links.move[toIndex]);
	}

	handleComplete() {
		this.props.completeTodoRequestAction(this.props.links.complete);
	}

	handleDelete() {
		this.props.deleteTodoRequestAction(this.props.links.delete);
	}

	callDisplaceHandler() {
		this.props.handleDisplace(this.props.links.displace);
	}
}

export default connect(null, {
	updateTodoRequestAction,
	deleteTodoRequestAction,
	completeTodoRequestAction
})(Todo);