import { mapStateToProps } from "../connector";

export default undefined;

describe('Header connector', () => {
    it('maps state to props', () => {
        const globalError = {
            message: 'someGlobalError',
        };
        const errors = {
            fieldErrors: [],
            globalErrors: [globalError],
        };
        const state = {
            completedList: null,
            links: {},
            list: null,
            errors,
            listOptions: [],
        };

        expect(mapStateToProps(state)).toEqual({
            globalErrors: [globalError],
        });
    });
});