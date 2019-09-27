import React, { Component } from 'react';
import { isMobile } from 'react-device-detect';
import { DndProvider } from 'react-dnd';
import Html5Backend from 'react-dnd-html5-backend';
import TouchBackend from 'react-dnd-touch-backend';
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
const decorateWithDragAndDrop = (DecoratedComponent: any) => {
    return (props: any) => {
        const backend = isMobile ? TouchBackend : Html5Backend;
        return (
            <DndProvider backend={backend}>
                <DecoratedComponent {...props} />
            </DndProvider>
        );
    };
};

export default decorateWithDragAndDrop(connect(mapStateToProps, {
    loadTodosViewAction,
})(TodosView));
