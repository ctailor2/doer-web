import _ from 'lodash';
import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { loadTodosViewAction, LoadTodosViewAction } from '../../actions/loadViewActions';
import { List } from '../../api/list';
import { ApplicationState } from '../../store';
import App from '../App';
import Header from '../Header';
import Loader from './Loader';

export interface Props {
    loadTodosViewAction: () => LoadTodosViewAction;
    list: List | {};
}

export class TodosView extends Component<Props> {
    public componentDidMount() {
        // TODO: May be able to optimize here by only firing this if the view is not loaded
        if (_.isNull(localStorage.getItem('sessionToken'))) {
            browserHistory.push('/login');
        } else {
            this.props.loadTodosViewAction();
        }
    }

    public render() {
        return (<div>
            <Header />
            {this.renderView()}
        </div>);
    }

    public renderView() {
        if (!_.isEmpty(this.props.list)) {
            return (<App />);
        }
        return (<Loader />);
    }
}

export const mapStateToProps = (state: ApplicationState) => {
    return {
        list: state.list,
    };
};

export default DragDropContext(HTML5Backend)(connect(mapStateToProps, {
    loadTodosViewAction,
})(TodosView));
