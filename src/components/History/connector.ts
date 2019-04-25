import { connect } from 'react-redux';
import { CompletedList } from '../../api/completedList';
import { ApplicationState } from '../../store';
import { History } from './History';

export const mapStateToProps = (state: ApplicationState) => {
    const completedList = state.completedList;
    const isCompletedList = (maybeCompletedList: CompletedList | null):
        maybeCompletedList is CompletedList => maybeCompletedList !== null;
    if (isCompletedList(completedList)) {
        return {
            todos: completedList.todos,
        };
    }
    return {
        todos: [],
    };
};

export default connect(mapStateToProps, {})(History);
