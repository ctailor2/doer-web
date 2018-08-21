import React, {Component} from 'react';
import Todo from './Todo';
import TaskForm from './TaskForm';
import {connect} from 'react-redux';
import {
    displaceTodoRequestAction,
    moveTodoRequestAction,
    pullTodosRequestAction
} from '../actions/todoActions';
import {
    getListRequestAction,
    unlockListRequestAction
} from '../actions/listActions';
import _ from 'lodash';
import {
	Row,
	Col,
	Button,
	ListGroup,
	Glyphicon,
	Tabs,
	Tab,
	ListGroupItem,
	Modal
} from 'react-bootstrap';

export class App extends Component {

	constructor(props) {
		super(props);
        this.timerTickMilliseconds = 1000;
		this.state = {
		    todo: {task: ''},
		    submitting: false,
		    showUnlockConfirmation: false,
		    activeTab: props.list.name,
		    unlockDuration: props.list.unlockDuration,
		    unlockTimer: this.createTimer()
		};
	}

	componentDidMount() {
        document.addEventListener('visibilitychange', this.handleVisibilityChange.bind(this));
	}

	componentWillUnmount() {
        document.removeEventListener('visibilitychange', this.handleVisibilityChange.bind(this));
	}

	handleVisibilityChange(event) {
	    let hidden = event.target.hidden;
	    if (hidden) {
	        clearTimeout(this.state.unlockTimer);
	    } else {
	        this.reloadList();
	    }
	}

	reloadList() {
	    this.props.getListRequestAction(this.props.listLink);
	}

	componentWillReceiveProps(nextProps) {
	    let currentUnlockDuration = this.state.unlockDuration;
	    let newUnlockDuration = nextProps.list.unlockDuration;
	    if(currentUnlockDuration === 0 || newUnlockDuration < currentUnlockDuration) {
            this.setTimer(newUnlockDuration);
	    }
	}

	setTimer(unlockDuration) {
		clearTimeout(this.state.unlockTimer);
        this.setState({
            unlockDuration: unlockDuration,
            unlockTimer: this.createTimer()
        });
	}

	createTimer() {
	    return setTimeout(this.decrementUnlockDuration.bind(this), this.timerTickMilliseconds);
	}

	decrementUnlockDuration() {
        if(this.state.unlockDuration > 0) {
    	    let newUnlockDuration = this.state.unlockDuration - this.timerTickMilliseconds;
    	    if (newUnlockDuration <= 0) {
    	        newUnlockDuration = 0;
    	        this.reloadList();
    	        this.setState({activeTab: this.props.list.name});
    	    }
    	    this.setTimer(newUnlockDuration);
        }
	}

	render() {
		return (<div>
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

	handleTaskChange(task) {
	    this.setState({todo: {task: task}});
	}

	handleSubmitChange(isSubmitting) {
	    this.setState({submitting: isSubmitting});
	}

	renderModal() {
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

	closeModal() {
	    this.setState({showUnlockConfirmation: false});
	}

	handleUnlockClick() {
	    this.props.unlockListRequestAction(this.props.list._links.unlock)
	    this.closeModal();
	}

	handleSelectTab(tabKey, event) {
	    if(tabKey === this.props.list.name) {
            this.setState({activeTab: tabKey});
	    } else {
            if(this.canViewDeferredTodos()) {
                this.setState({activeTab: tabKey});
            } else {
                this.setState({showUnlockConfirmation: true});
            }
	    }
	}

	renderTabs() {
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
		        <Tab eventKey={this.props.list.deferredName} title={this.renderDeferredTodosTabTitle()} disabled={this.deferredTodosTabIsDisabled()}>
					<ListGroup>
                        {this.props.list.deferredTodos.map((todo, index) => {
                            return this.renderListItem(todo, index);
                        })}
                    </ListGroup>
                </Tab>
            </Tabs>
		);
	}

	deferredTodosTabIsDisabled() {
	    return !this.canViewDeferredTodos() && _.isUndefined(this.props.list._links.unlock)
	}

	renderDeferredTodosTabTitle() {
	    let tabName = _.capitalize(this.props.list.deferredName)
	    if(this.canViewDeferredTodos()) {
    	    let unlockDuration = new Date(this.state.unlockDuration).toISOString().substr(14, 5)
            return (<div>
                {tabName} {unlockDuration}
            </div>);
	    } else {
            return (<div>
                <Glyphicon glyph="lock" /> {tabName}
            </div>);
	    }
	}

	canViewDeferredTodos() {
	    return this.state.unlockDuration > 0;
	}

	renderReplenishButton() {
		if(!_.isUndefined(this.props.list._links.pull)) {
			return (<ListGroupItem onClick={this.handlePullClick.bind(this)} bsStyle="info" className="refresh">
                Replenish <Glyphicon glyph="refresh" />
            </ListGroupItem>);
		}
	}

	handlePullClick() {
		this.props.pullTodosRequestAction(this.props.list._links.pull);
	}

	renderDisplaceButton() {
        if(!_.isUndefined(this.props.list._links.displace) && this.state.submitting) {
            return (<ListGroupItem onClick={this.handleDisplaceClick.bind(this)} bsStyle="info" className="displace">
                Now <Glyphicon glyph="chevron-down" />
            </ListGroupItem>);
        }
	}

	handleDisplaceClick() {
		let todo = this.state.todo;
		this.props.displaceTodoRequestAction(this.props.list._links.displace, todo);
		this.setState({todo: {task: ''}, submitting: false});
	}

	renderList(todos) {
		return(<ListGroup>
			{todos.map((todo, index) => {
				return this.renderListItem(todo, index);
            })}
		</ListGroup>);
	}

	moveItem(link) {
	    this.props.moveTodoRequestAction(link);
	}

	renderListItem(todo, index) {
		return (<Todo key={index}
					index={index}
					handleMove={this.moveItem.bind(this)}
					readOnly={this.state.submitting}
					task={todo.task}
					links={todo._links} />);
	}
}

export const mapStateToProps = (state) => {
	return {
		list: state.list,
		listLink: state.links.list
	};
}

export default connect(mapStateToProps, {
	displaceTodoRequestAction,
	moveTodoRequestAction,
	pullTodosRequestAction,
	unlockListRequestAction,
	getListRequestAction
})(App);