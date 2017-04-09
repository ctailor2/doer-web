import React, {Component} from 'react';
import {connect} from 'react-redux';
import {loadTodosViewAction} from '../../actions/loadViewActions';
import Header from '../Header';
import App from '../App';
import Loader from '../views/Loader';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import _ from 'lodash';
import {browserHistory} from 'react-router';

export class TodosView extends Component {
	componentDidMount() {
		// TODO: May be able to optimize here by only firing this if the view is not loaded
        if(_.isNull(localStorage.getItem('sessionToken'))) {
            browserHistory.push('/login');
        } else {
            this.props.loadTodosViewAction();
        }
	}

	render() {
		return (<div>
			<Header />
			{this.renderView()}
		</div>);
	}

	renderView() {
		if(this.props.viewLoaded) {
			return (<App />);
		}
		return (<Loader />)
	}
}

export const mapStateToProps = (state) => {
	return {
		viewLoaded: state.loadView.todosViewLoaded
	};
}

export default DragDropContext(HTML5Backend)(connect(mapStateToProps, {
	loadTodosViewAction
})(TodosView));