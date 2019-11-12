import { connect } from 'react-redux';
import { getListRequestAction, unlockListRequestAction } from '../../actions/listActions';
import {
    displaceTodoRequestAction,
    escalateTodosRequestAction,
    moveTodoRequestAction,
    pullTodosRequestAction,
} from '../../actions/todoActions';
import { App } from './App';

export default connect(null, {
    displaceTodoRequestAction,
    moveTodoRequestAction,
    pullTodosRequestAction,
    escalateTodosRequestAction,
    unlockListRequestAction,
    getListRequestAction,
})(App);
