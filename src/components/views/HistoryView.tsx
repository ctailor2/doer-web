import React, {Component} from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {loadHistoryViewAction, LoadHistoryViewAction} from '../../actions/loadViewActions';
import { CompletedList } from '../../api/completedList';
import { ApplicationState } from '../../store';
import Header from '../Header';
import History from '../History';
import Loader from './Loader';

interface Props {
    list: CompletedList | null;
    loadHistoryViewAction(): LoadHistoryViewAction;
}

export class HistoryView extends Component<Props> {
    public componentDidMount() {
        if (localStorage.getItem('sessionToken') === null) {
            browserHistory.push('/login');
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
    };
};

export default connect(mapStateToProps, {
    loadHistoryViewAction,
})(HistoryView);
