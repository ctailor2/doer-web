import { mapStateToProps } from "../connector";

export default undefined;

describe('History connector', () => {
    it('maps state to props', () => {
        const todo = { task: 'someTask', completedAt: '2017-01-01T10:50:44+0000' };
        const completedList = { todos: [todo] };
        const state = {
            completedList,
            links: {},
            list: { listAndLink: null, selectedList: null },
            errors: {
                fieldErrors: [],
                globalErrors: [],
            },
            listOptions: [],
        };
        expect(mapStateToProps(state)).toEqual({
            todos: [todo],
        });
    });
});
