import React from 'react';
import { isMobile } from 'react-device-detect';
import { DndProvider } from 'react-dnd';
import Html5Backend from 'react-dnd-html5-backend';
import TouchBackend from 'react-dnd-touch-backend';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { loadTodosViewAction, LoadTodosViewAction } from '../../actions/loadViewActions';
import { ListAndLink } from '../../api/list';
import { ApplicationState } from '../../store';
import App from '../App';
import Header from '../Header';
import Loader from './Loader';

export interface Props {
    loadTodosViewAction: () => LoadTodosViewAction;
    list: ListAndLink | null;
    selectedList: string | null;
}

export const TodosView = ({loadTodosViewAction, list, selectedList}: Props) => {
    React.useEffect(() => {
        // TODO: May be able to optimize here by only firing this if the view is not loaded
        if (localStorage.getItem('sessionToken') === null) {
            browserHistory.push('/login');
        } else if (list === null) {
            loadTodosViewAction();
        }
    }, [list]);

    const renderView = () => {
        if (selectedList !== null && list !== null) {
            return (<App listAndLink={list} selectedList={selectedList} />);
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
        list: state.list.listAndLink,
        selectedList: state.list.selectedList,
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
