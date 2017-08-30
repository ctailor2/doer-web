import React, { Component } from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import {
	Button,
	Glyphicon,
	FormControl,
	FormGroup,
	InputGroup
} from 'react-bootstrap';
import {HotKeys} from 'react-hotkeys';
import {createTodoRequestAction} from '../actions/todoActions';

export class TaskForm extends Component {
	componentWillReceiveProps(nextProps) {
	    if (nextProps.task === '') {
	        this.taskInput.value = nextProps.task;
	    }
	}

	render() {
	    return (<div>
            <FormGroup bsSize="large">
                <InputGroup>
                    <HotKeys handlers={{cancel: (event) => this.handleCancelTaskSubmit(event)}}>
                        <HotKeys handlers={{submit: (event) => this.handleTaskSubmit(event)}}>
                            <FormControl
                                type="text"
                                inputRef={ref => { this.taskInput = ref; }}
                                onChange={this.handleTodoDescriptionOnChange.bind(this)}/>
                        </HotKeys>
                    </HotKeys>
                    {this.renderFormButtonGroup()}
                </InputGroup>
            </FormGroup>
        </div>);
	}

	renderFormButtonGroup() {
        if(this.props.submitting) {
            return(<InputGroup.Button>
                    {this.renderNowButton()}
                    <Button type="button" bsSize="large" onClick={this.submitTodo.bind(this, this.props.links.createDeferred)}>{_.capitalize(this.props.secondaryButtonName)}</Button>
                    <Button type="button" bsStyle="danger" bsSize="large" onClick={this.handleCancelTaskSubmit.bind(this)}>
                        <Glyphicon glyph="remove"/>
                    </Button>
                </InputGroup.Button>);
        } else {
            return(<InputGroup.Button>
                    <Button type="button" bsStyle="primary" bsSize="large"
                        disabled={this.submitButtonIsDisabled()}
                        onClick={this.toggleSubmit.bind(this)}>
                            Do!
                    </Button>
                </InputGroup.Button>);
        }
    }

    handleTodoDescriptionOnChange(event) {
        this.props.handleTaskChange(event.target.value);
    }

    submitButtonIsDisabled() {
        return !this.todoHasTask();
    }

    toggleSubmit() {
        this.props.handleSubmitChange(!this.props.submitting);
    }

    submitTodo(link) {
        let todo = {task: this.props.task};
        this.props.createTodoRequestAction(link, todo);
        this.toggleSubmit();
        this.resetTask();
    }

    resetTask() {
        this.props.handleTaskChange('');
        this.taskInput.value = '';
        this.taskInput.focus();
    }

    handleCancelTaskSubmit() {
        if(this.props.submitting) {
            this.toggleSubmit();
            this.taskInput.focus();
        }
    }

    handleTaskSubmit() {
        if(!this.props.submitting && this.todoHasTask()) {
            this.toggleSubmit();
        }
    }

    renderNowButton() {
        if(this.canScheduleForNow()) {
            return (<Button type="button" bsStyle="primary" bsSize="large" onClick={this.submitTodo.bind(this, this.props.links.create)}>{_.capitalize(this.props.primaryButtonName)}</Button>);
        }
    }

    canScheduleForNow() {
        return !_.isUndefined(this.props.links.create);
    }

    todoHasTask() {
        return this.props.task.match(/\w+/);
    }
}

export default connect(null, {
	createTodoRequestAction
})(TaskForm);