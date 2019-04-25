import { connect } from 'react-redux';
import {
    completeTodoRequestAction,
    deleteTodoRequestAction,
    updateTodoRequestAction,
} from '../../actions/todoActions';
import { Todo } from './Todo';

export default connect(null, {
    updateTodoRequestAction,
    deleteTodoRequestAction,
    completeTodoRequestAction,
})(Todo);
