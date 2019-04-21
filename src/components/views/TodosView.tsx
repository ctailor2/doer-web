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
    list: List | null;
}

export class TodosView extends Component<Props> {
    public componentDidMount() {
        // TODO: May be able to optimize here by only firing this if the view is not loaded
        if (localStorage.getItem('sessionToken') === null) {
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
        if (this.props.list !== null) {
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
