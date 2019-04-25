import _ from 'lodash';
import React, { ChangeEvent, Component, createRef, useRef } from 'react';
import {
    Button,
    FormControl,
    FormGroup,
    Glyphicon,
    InputGroup,
} from 'react-bootstrap';
import { HotKeys } from 'react-hotkeys';
import { createTodoRequestAction } from '../../actions/todoActions';
import { Link } from '../../api/api';
import { List } from '../../api/list';

export interface Props {
    primaryButtonName: string;
    secondaryButtonName: string;
    submitting: boolean;
    task: string;
    links: List['_links'];
    handleTaskChange: (task: string) => void;
    handleSubmitChange: (isSubmitting: boolean) => void;
    createTodoRequestAction: typeof createTodoRequestAction;
}

export class TaskForm extends Component<Props> {
    public taskInput: HTMLInputElement | null = null;

    public componentWillReceiveProps(nextProps: Props) {
        if (nextProps.task === '' && this.taskInput) {
            this.taskInput.value = nextProps.task;
        }
    }

    public render() {
        return (<div>
            <FormGroup bsSize="large">
                <InputGroup>
                    <HotKeys handlers={{ cancel: () => this.handleCancelTaskSubmit() }}>
                        <HotKeys handlers={{ submit: () => this.handleTaskSubmit() }}>
                            <FormControl
                                type="text"
                                inputRef={(ref) => { this.taskInput = ref; }}
                                onChange={this.handleTodoDescriptionOnChange.bind(this)} />
                        </HotKeys>
                    </HotKeys>
                    {this.renderFormButtonGroup()}
                </InputGroup>
            </FormGroup>
        </div>);
    }

    public renderFormButtonGroup() {
        if (this.props.submitting) {
            return (<InputGroup.Button>
                {this.renderNowButton()}
                <Button
                    type="button"
                    bsSize="large"
                    onClick={this.submitTodo.bind(this, this.props.links.createDeferred)}>
                    {_.capitalize(this.props.secondaryButtonName)}</Button>
                <Button
                    type="button"
                    bsStyle="danger"
                    bsSize="large"
                    onClick={this.handleCancelTaskSubmit.bind(this)}>
                    <Glyphicon glyph="remove" />
                </Button>
            </InputGroup.Button>);
        } else {
            return (<InputGroup.Button>
                <Button type="button" bsStyle="primary" bsSize="large"
                    disabled={this.submitButtonIsDisabled()}
                    onClick={this.toggleSubmit.bind(this)}>
                    Do!
                    </Button>
            </InputGroup.Button>);
        }
    }

    public handleTodoDescriptionOnChange(event: ChangeEvent<FormControl & HTMLInputElement>) {
        this.props.handleTaskChange(event.target.value);
    }

    public submitButtonIsDisabled() {
        return !this.todoHasTask();
    }

    public toggleSubmit() {
        this.props.handleSubmitChange(!this.props.submitting);
    }

    public submitTodo(link: Link) {
        const todo = { task: this.props.task };
        this.props.createTodoRequestAction(link, todo);
        this.toggleSubmit();
        this.resetTask();
    }

    public resetTask() {
        if (this.taskInput) {
            this.props.handleTaskChange('');
            this.taskInput.value = '';
            this.taskInput.focus();
        }
    }

    public handleCancelTaskSubmit() {
        if (this.props.submitting && this.taskInput) {
            this.toggleSubmit();
            this.taskInput.focus();
        }
    }

    public handleTaskSubmit() {
        if (!this.props.submitting && this.todoHasTask()) {
            this.toggleSubmit();
        }
    }

    public renderNowButton() {
        const createLink = this.props.links.create;
        if (this.linkExists(createLink)) {
            return (<Button
                type="button"
                bsStyle="primary"
                bsSize="large"
                onClick={this.submitTodo.bind(this, createLink)}>
                {_.capitalize(this.props.primaryButtonName)}</Button>);
        }
    }

    public linkExists(maybeLink: Link | undefined): maybeLink is Link {
        return !_.isUndefined(maybeLink);
    }

    public todoHasTask() {
        return this.props.task.match(/\w+/);
    }
}


