import React, { ChangeEvent, Component } from 'react';
import {
    Button,
    Col,
    FormControl,
    FormGroup,
    Glyphicon,
    InputGroup,
    ListGroupItem,
    Row,
} from 'react-bootstrap';
import {
    completeTodoRequestAction,
    deleteTodoRequestAction,
    updateTodoRequestAction,
} from '../../actions/todoActions';
import { Link } from '../../api/api';
import { TodoLinks } from '../../api/todo';
import DraggableListGroupItem from '../DraggableListGroupItem/DraggableListGroupItem';

export interface Props {
    task: string;
    index: number;
    links: TodoLinks['_links'];
    updateTodoRequestAction: typeof updateTodoRequestAction;
    completeTodoRequestAction: typeof completeTodoRequestAction;
    deleteTodoRequestAction: typeof deleteTodoRequestAction;
    handleMove: (link: Link) => void;
}

export interface State {
    editMode: boolean;
    task: string;
}

export class Todo extends Component<Props, State> {
    private taskInput: HTMLInputElement | null = null;

    constructor(props: Props) {
        super(props);
        this.state = { editMode: false, task: props.task };
    }

    public handleEditClick() {
        this.setState({ editMode: true, task: this.props.task });
    }

    public render() {
        return this.editableTodo();
    }

    public componentDidUpdate() {
        if (this.state.editMode && this.taskInput) {
            this.taskInput.focus();
        }
    }

    public handleChange(event: ChangeEvent<FormControl & HTMLInputElement>) {
        this.setState({ task: event.target.value });
    }

    public handleEditCancel() {
        this.setState({ editMode: false, task: this.props.task });
    }

    public saveButtonDisabled() {
        return this.state.task === this.props.task;
    }

    public handleSave() {
        this.props.updateTodoRequestAction(this.props.links.update, { task: this.state.task });
        this.setState({ editMode: false });
    }

    public editableTodo() {
        if (this.state.editMode) {
            return (<ListGroupItem>
                <Row>
                    <Col lg={12}>
                        <FormGroup bsSize="small">
                            <InputGroup>
                                <FormControl type="text"
                                    inputRef={(ref) => { this.taskInput = ref; }}
                                    value={this.state.task}
                                    onChange={this.handleChange.bind(this)} />
                                <InputGroup.Button>
                                    <Button
                                        type="button"
                                        bsSize="small"
                                        bsStyle="primary"
                                        onClick={this.handleSave.bind(this)}
                                        disabled={this.saveButtonDisabled()}>Save</Button>
                                    <Button
                                        type="button"
                                        bsSize="small"
                                        bsStyle="danger"
                                        onClick={this.handleEditCancel.bind(this)}>Cancel</Button>
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
                        onChange={this.handleComplete.bind(this)} /></Col>
                    <Col lg={9} xs={9}>{this.props.task}</Col>
                    <Col lg={1} xs={1}>
                        <Button
                            className="icon-button"
                            bsStyle="primary"
                            type="button"
                            bsSize="xsmall"
                            onClick={this.handleEditClick.bind(this)}><Glyphicon glyph="pencil" /></Button></Col>
                    <Col lg={1} xs={1}>
                        <a
                            className="icon-button"
                            onClick={this.handleDelete.bind(this)}><Glyphicon glyph="remove" /></a></Col>
                </Row>
            </DraggableListGroupItem>);
        }
    }

    public handleMove(toIndex: number) {
        this.props.handleMove(this.props.links.move[toIndex]);
    }

    public handleComplete() {
        this.props.completeTodoRequestAction(this.props.links.complete);
    }

    public handleDelete() {
        this.props.deleteTodoRequestAction(this.props.links.delete);
    }
}
