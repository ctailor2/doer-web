import { connect } from 'react-redux';
import { createTodoRequestAction } from '../../actions/todoActions';
import { TaskForm } from './TaskForm';

export default connect(null, {
    createTodoRequestAction,
})(TaskForm);
