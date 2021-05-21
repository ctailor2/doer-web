import React from 'react';
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

export const HistoryView = ({list, completedListLink, loadHistoryViewAction, getCompletedListRequestAction}: Props) => {
    React.useEffect(() => {
        if (localStorage.getItem('sessionToken') === null) {
            browserHistory.push('/login');
        } else if (completedListLink !== null) {
            getCompletedListRequestAction(completedListLink);
        } else {
            loadHistoryViewAction();
        }
    });
    
    const renderView = () => {
        if (list !== null) {
            return (<History />);
        }
        return (<Loader />);
    }

    return (<div>
        <Header />
        {renderView()}
    </div>);
}

export const mapStateToProps = (state: ApplicationState) => {
    return {
        list: state.completedList,
        completedListLink: state.list.listAndLink !== null ? state.list.listAndLink!.list._links.completed : null,
    };
};

export default connect(mapStateToProps, {
    loadHistoryViewAction,
    getCompletedListRequestAction,
})(HistoryView);
