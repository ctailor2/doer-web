export default undefined;
import { ApplicationAction } from '../../actions/actions';
import { CompletedList } from '../../api/completedList';
import { ActionTypes } from '../../constants/actionTypes';
import { completedList, defaultState } from '../completedListReducer';

describe('completedList', () => {
    it('has initial state', () => {
        expect(completedList(undefined, { type: ActionTypes.GET_BASE_RESOURCES_REQUEST_ACTION })).toEqual(defaultState);
    });

    it('stores the links from a STORE_COMPLETED_LIST_ACTION when received', () => {
        const action = {
            type: ActionTypes.STORE_COMPLETED_LIST_ACTION,
            list: {
                todos: [{
                    task: 'someTask',
                    completedAt: 'someTime',
                }],
            },
        } as ApplicationAction;
        const state = completedList(defaultState, action) as CompletedList;
        expect(state.todos).toContainEqual({
            task: 'someTask',
            completedAt: 'someTime',
        });
    });
});
