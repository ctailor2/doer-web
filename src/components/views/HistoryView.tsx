import React, {Component} from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import { getCompletedListRequestAction } from '../../actions/listActions';
import {loadHistoryViewAction} from '../../actions/loadViewActions';
import { Link } from '../../api/api';
import { CompletedList } from '../../api/completedList';
import { ApplicationState } from '../../store';
import Header from '../Header';
import History from '../History';
import Loader from './Loader';

interface Props {
    list: CompletedList | null;
    completedListLink: Link | null;
    loadHistoryViewAction: typeof loadHistoryViewAction;
    getCompletedListRequestAction: typeof getCompletedListRequestAction;
}

export class HistoryView extends Component<Props> {
    public componentDidMount() {
        if (localStorage.getItem('sessionToken') === null) {
            browserHistory.push('/login');
        } else if (this.props.completedListLink !== null) {
            this.props.getCompletedListRequestAction(this.props.completedListLink);
        } else {
            this.props.loadHistoryViewAction();
        }
    }

    public render() {
        return (<div>
            <Header />
            {this.renderView()}
        </div>);
    }

    public renderView() {
        if (this.props.list !== null) {
            return (<History />);
        }
        return (<Loader />);
    }
}

export const mapStateToProps = (state: ApplicationState) => {
    return {
        list: state.completedList,
        completedListLink: state.list !== null ? state.list.list._links.completed : null,
    };
};

export default connect(mapStateToProps, {
    loadHistoryViewAction,
    getCompletedListRequestAction,
})(HistoryView);
