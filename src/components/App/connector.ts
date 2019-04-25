import { connect } from 'react-redux';
import { getListRequestAction, unlockListRequestAction } from '../../actions/listActions';
import {
    displaceTodoRequestAction,
    escalateTodosRequestAction,
    moveTodoRequestAction,
    pullTodosRequestAction,
} from '../../actions/todoActions';
import { App, mapStateToProps } from './App';

export default connect(mapStateToProps, {
    displaceTodoRequestAction,
    moveTodoRequestAction,
    pullTodosRequestAction,
    escalateTodosRequestAction,
    unlockListRequestAction,
    getListRequestAction,
})(App);
