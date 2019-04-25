import { connect } from 'react-redux';
import { getListRequestAction, unlockListRequestAction } from '../../actions/listActions';
import {
    displaceTodoRequestAction,
    escalateTodosRequestAction,
    moveTodoRequestAction,
    pullTodosRequestAction,
} from '../../actions/todoActions';
import { ApplicationState } from '../../store';
import { App } from './App';

export const mapStateToProps = (state: ApplicationState) => ({
    list: state.list,
    listLink: state.links.list,
});

export default connect(mapStateToProps, {
    displaceTodoRequestAction,
    moveTodoRequestAction,
    pullTodosRequestAction,
    escalateTodosRequestAction,
    unlockListRequestAction,
    getListRequestAction,
})(App);
