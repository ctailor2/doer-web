import { mapStateToProps } from "../connector";

export default undefined;

describe('App connector', () => {
    it('maps state to props', () => {
        const myListLink = { href: 'http://some.api/list' };
        const myList = {
            profileName: 'someProfileName',
            name: 'cool list',
            deferredName: 'neato',
            todos: [],
            deferredTodos: [],
            unlockDuration: 0,
            _links: {
                createDeferred: { href: '' },
            },
        };
        const state = {
            links: {
                list: myListLink,
            },
            list: myList,
            completedList: null,
            errors: {
                fieldErrors: [],
                globalErrors: [],
            },
            listOptions: [],
        };

        expect(mapStateToProps(state)).toEqual({
            list: myList,
            listLink: myListLink,
        });
    });
});
