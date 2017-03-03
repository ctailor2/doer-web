import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getHomeResourcesRequestAction} from '../../actions/homeResourcesActions';
import {getTodosRequestAction} from '../../actions/todoActions';
import Header from '../Header';
import App from '../App';
import SplashView from '../views/SplashView';
import _ from 'lodash';

export class TodosView extends Component {
	componentDidMount() {
		this.props.getHomeResourcesRequestAction({href: localStorage.getItem('link')});
	}

	componentDidUpdate(prevProps) {
		if(_.isEmpty(prevProps.links) && !_.isEmpty(this.props.links)) {
			this.props.getTodosRequestAction(this.props.links.todos);
		}
	}

	render() {
		return (<div>
			<Header />
			{this.renderView()}
		</div>);
	}

	renderView() {
		if(_.isEmpty(this.props.links)) {
			return (<SplashView />)
		}
		return (<App />);
	}
}

export const mapStateToProps = (state) => {
	return {
		links: state.links
	};
}

export default connect(mapStateToProps, {
	getHomeResourcesRequestAction,
	getTodosRequestAction
})(TodosView);