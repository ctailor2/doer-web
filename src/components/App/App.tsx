import _ from 'lodash';
import React, { Component } from 'react';
import {
    Button,
    Col,
    DropdownButton,
    FormGroup,
    Glyphicon,
    ListGroup,
    ListGroupItem,
    Modal,
    Row,
    Tab,
    Tabs,
} from 'react-bootstrap';
import {
    getListRequestAction,
    unlockListRequestAction,
} from '../../actions/listActions';
import {
    displaceTodoRequestAction,
    escalateTodosRequestAction,
    moveTodoRequestAction,
    pullTodosRequestAction,
} from '../../actions/todoActions';
import { Link } from '../../api/api';
import { List } from '../../api/list';
import { Todo as DomainTodo, TodoForm } from '../../api/todo';
import TaskForm from '../TaskForm';
import Todo from '../Todo';

export interface Props {
    list: List;
    listLink: Link;
    getListRequestAction: typeof getListRequestAction;
    unlockListRequestAction: typeof unlockListRequestAction;
    pullTodosRequestAction: typeof pullTodosRequestAction;
    escalateTodosRequestAction: typeof escalateTodosRequestAction;
    displaceTodoRequestAction: typeof displaceTodoRequestAction;
    moveTodoRequestAction: typeof moveTodoRequestAction;
}

export interface State {
    unlockDuration: number;
    todo: TodoForm;
    submitting: boolean;
    showUnlockConfirmation: boolean;
    activeTab: string;
    unlockTimer: NodeJS.Timeout;
}

export class App extends Component<Props, State> {
    private timerTickMilliseconds = 1000;

    constructor(props: Props) {
        super(props);
        this.state = {
            todo: { task: '' },
            submitting: false,
            showUnlockConfirmation: false,
            activeTab: props.list.name,
            unlockDuration: props.list.unlockDuration,
            unlockTimer: this.createTimer(),
        };
    }

    public componentDidMount() {
        document.addEventListener('visibilitychange', this.handleVisibilityChange.bind(this));
    }

    public componentWillUnmount() {
        document.removeEventListener('visibilitychange', this.handleVisibilityChange.bind(this));
    }

    public handleVisibilityChange(event: DocumentEventMap['visibilitychange']) {
        const target = event.target as HTMLElement;
        const hidden = target !== null && target.hidden;
        if (hidden) {
            clearTimeout(this.state.unlockTimer);
        } else {
            this.reloadList();
        }
    }

    public reloadList() {
        this.props.getListRequestAction(this.props.listLink);
    }

    public componentWillReceiveProps(nextProps: Props) {
        const currentUnlockDuration = this.state.unlockDuration;
        const newUnlockDuration = nextProps.list.unlockDuration;
        if (currentUnlockDuration === 0 || newUnlockDuration < currentUnlockDuration) {
            this.setTimer(newUnlockDuration);
        }
    }

    public setTimer(unlockDuration: number) {
        clearTimeout(this.state.unlockTimer);
        this.setState({
            unlockDuration,
            unlockTimer: this.createTimer(),
        });
    }

    public createTimer() {
        return setTimeout(this.decrementUnlockDuration.bind(this), this.timerTickMilliseconds);
    }

    public decrementUnlockDuration() {
        if (this.state.unlockDuration > 0) {
            let newUnlockDuration = this.state.unlockDuration - this.timerTickMilliseconds;
            if (newUnlockDuration <= 0) {
                newUnlockDuration = 0;
                this.reloadList();
                this.setState({ activeTab: this.props.list.name });
            }
            this.setTimer(newUnlockDuration);
        }
    }

    public render() {
        return (<div>
            <Row>
                <Col lg={6} lgOffset={3}>
                    <FormGroup bsSize="large">
                        <DropdownButton
                            id="list-dropdown-button"
                            title={this.props.list.profileName}
                            disabled={true}
                            noCaret={true}/>
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col lg={6} lgOffset={3}>
                    <TaskForm task={this.state.todo.task}
                        primaryButtonName={this.props.list.name}
                        secondaryButtonName={this.props.list.deferredName}
                        submitting={this.state.submitting}
                        links={this.props.list._links}
                        handleTaskChange={this.handleTaskChange.bind(this)}
                        handleSubmitChange={this.handleSubmitChange.bind(this)} />
                    {this.renderTabs()}
                </Col>
            </Row>
            {this.renderModal()}
        </div>);
    }

    public handleTaskChange(task: string) {
        this.setState({ todo: { task } });
    }

    public handleSubmitChange(isSubmitting: boolean) {
        this.setState({ submitting: isSubmitting });
    }

    public renderModal() {
        return (<Modal show={this.state.showUnlockConfirmation} onHide={this.closeModal.bind(this)}>
            <Modal.Header closeButton>
                <Modal.Title>Unlock Later list?</Modal.Title>
            </Modal.Header>
            <Modal.Body>The Later list can only be unlocked once a day.</Modal.Body>
            <Modal.Footer>
                <Button onClick={this.closeModal.bind(this)}>Cancel</Button>
                <Button onClick={this.handleUnlockClick.bind(this)}>Unlock</Button>
            </Modal.Footer>
        </Modal>);
    }

    public closeModal() {
        this.setState({ showUnlockConfirmation: false });
    }

    public handleUnlockClick() {
        const unlockLink = this.props.list._links.unlock;
        if (unlockLink) {
            this.props.unlockListRequestAction(unlockLink);
            this.closeModal();
        }
    }

    public handleSelectTab(tabKey: any & string) {
        if (tabKey === this.props.list.name) {
            this.setState({ activeTab: tabKey });
        } else {
            if (this.canViewDeferredTodos()) {
                this.setState({ activeTab: tabKey });
            } else {
                this.setState({ showUnlockConfirmation: true });
            }
        }
    }

    public renderTabs() {
        return (
            <Tabs activeKey={this.state.activeTab} onSelect={this.handleSelectTab.bind(this)} id='tabs'>
                <Tab eventKey={this.props.list.name} title={_.capitalize(this.props.list.name)}>
                    <ListGroup>
                        {this.renderDisplaceButton()}
                        {this.props.list.todos.map((todo, index) => {
                            return this.renderListItem(todo, index);
                        })}
                        {this.renderReplenishButton()}
                    </ListGroup>
                </Tab>
                <Tab
                    eventKey={this.props.list.deferredName}
                    title={this.renderDeferredTodosTabTitle()}
                    disabled={this.deferredTodosTabIsDisabled()}>
                    <ListGroup>
                        {this.renderEscalateButton()}
                        {this.props.list.deferredTodos.map((todo, index) => {
                            return this.renderListItem(todo, index);
                        })}
                    </ListGroup>
                </Tab>
            </Tabs>
        );
    }

    public deferredTodosTabIsDisabled() {
        return !this.canViewDeferredTodos() && _.isUndefined(this.props.list._links.unlock);
    }

    public renderDeferredTodosTabTitle() {
        const tabName = _.capitalize(this.props.list.deferredName);
        if (this.canViewDeferredTodos()) {
            const unlockDuration = new Date(this.state.unlockDuration).toISOString().substr(14, 5);
            return (<div>
                {tabName} {unlockDuration}
            </div>);
        } else {
            return (<div>
                <Glyphicon glyph="lock" /> {tabName}
            </div>);
        }
    }

    public canViewDeferredTodos() {
        return this.state.unlockDuration > 0;
    }

    public renderReplenishButton() {
        const pullLink = this.props.list._links.pull;
        if (!_.isUndefined(pullLink)) {
            return (<ListGroupItem
                onClick={this.handlePullClick.bind(this, pullLink)}
                bsStyle="info"
                className="refresh">
                Replenish <Glyphicon glyph="refresh" />
            </ListGroupItem>);
        }
    }

    public handlePullClick(pullLink: Link) {
        this.props.pullTodosRequestAction(pullLink);
    }

    public renderEscalateButton() {
        const escalateLink = this.props.list._links.escalate;
        if (!_.isUndefined(escalateLink)) {
            return (<ListGroupItem
                onClick={this.handleEscalateClick.bind(this, escalateLink)}
                bsStyle="info"
                className="escalate">
                Escalate <Glyphicon glyph="sort" />
            </ListGroupItem>);
        }
    }

    public handleEscalateClick(escalateLink: Link) {
        this.props.escalateTodosRequestAction(escalateLink);
    }

    public renderDisplaceButton() {
        const displaceLink = this.props.list._links.displace;
        if (!_.isUndefined(displaceLink) && this.state.submitting) {
            return (<ListGroupItem
                onClick={this.handleDisplaceClick.bind(this, displaceLink)}
                bsStyle="info"
                className="displace">
                Now <Glyphicon glyph="chevron-down" />
            </ListGroupItem>);
        }
    }

    public handleDisplaceClick(displaceLink: Link) {
        const todo = this.state.todo;
        this.props.displaceTodoRequestAction(displaceLink, todo);
        this.setState({ todo: { task: '' }, submitting: false });
    }

    public renderList(todos: DomainTodo[]) {
        return (<ListGroup>
            {todos.map((todo, index) => {
                return this.renderListItem(todo, index);
            })}
        </ListGroup>);
    }

    public moveItem(link: Link) {
        this.props.moveTodoRequestAction(link);
    }

    public renderListItem(todo: DomainTodo, index: number) {
        return (<Todo key={index}
            index={index}
            handleMove={this.moveItem.bind(this)}
            task={todo.task}
            links={todo._links} />);
    }
}
