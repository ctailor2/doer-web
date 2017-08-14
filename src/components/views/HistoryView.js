import React, {Component} from 'react';
import {connect} from 'react-redux';
import {loadHistoryViewAction} from '../../actions/loadViewActions';
import Header from '../Header';
import History from '../History';
import Loader from '../views/Loader';
import _ from 'lodash';
import {browserHistory} from 'react-router';

export class HistoryView extends Component {
    componentDidMount() {
        if(_.isNull(localStorage.getItem('sessionToken'))) {
            browserHistory.push('/login');
        } else {
            this.props.loadHistoryViewAction();
        }
    }

    render() {
        return (<div>
            <Header />
            {this.renderView()}
        </div>);
    }

    renderView() {
        if(!_.isEmpty(this.props.todos)) {
            return (<History />);
        }
        return (<Loader />)
    }
}

export const mapStateToProps = (state) => {
    return {
        todos: state.todos.completed
    };
}

export default connect(mapStateToProps, {
    loadHistoryViewAction
})(HistoryView);