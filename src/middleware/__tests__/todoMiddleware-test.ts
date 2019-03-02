import MockAdapter from "axios-mock-adapter";
import { applyMiddleware, createStore } from "redux";
import { ApplicationAction } from "../../actions/actions";
import { UpdateTodoRequestAction } from "../../actions/todoActions";
import { Link } from "../../api/api";
import { Todo } from "../../api/todo";
import { ActionTypes } from "../../constants/actionTypes";
import { client } from "../apiClient";
import { ApplicationStore, reducer } from "../../store";
import actionCapturingMiddleware from "../../utils/actionCapturingMiddleware";
import todoMiddleware from "../todoMiddleware";

export default undefined;

describe('todo middleware', () => {
    const mockAdapter = new MockAdapter(client);
    let capturedActions: ApplicationAction[];
    let store: ApplicationStore;

    beforeEach(() => {
        capturedActions = [];
        store = createStore(
            reducer,
            applyMiddleware(todoMiddleware, actionCapturingMiddleware(capturedActions)),
        );
        mockAdapter.reset();
    });

    it('gets the list when todo deleted', (done) => {
        const deleteLink = { href: 'deleteHref' };
        const listLink = { href: 'listHref' };
        mockAdapter.onDelete(deleteLink.href)
            .reply(202, {
                _links: {
                    list: listLink,
                },
            });
        store.dispatch({
            type: ActionTypes.DELETE_TODO_REQUEST_ACTION,
            link: deleteLink,
        });

        setTimeout(() => {
            expect(capturedActions).toContainEqual({
                type: ActionTypes.GET_LIST_REQUEST_ACTION,
                link: listLink,
            });
            done();
        });
    });

    type TodoApplicationAction = ApplicationAction & { link: Link, todo: Todo };
    const todoActionScenarios: Array<{ description: string, action: TodoApplicationAction }> = [
        {
            description: 'todo creation',
            action: {
                type: ActionTypes.CREATE_TODO_REQUEST_ACTION,
                link: { href: 'createHref' },
                todo: { task: 'someTask' },
            },
        },
        {
            description: 'todo displacement',
            action: {
                type: ActionTypes.DISPLACE_TODO_REQUEST_ACTION,
                link: { href: 'displaceHref' },
                todo: { task: 'someTask' },
            },
        },
    ];

    todoActionScenarios.map((scenario) => {
        describe(scenario.description, () => {
            it('clears errors', () => {
                store.dispatch(scenario.action);

                expect(capturedActions).toContainEqual({
                    type: ActionTypes.CLEAR_ERRORS_ACTION,
                });
            });

            describe('on success', () => {
                const listLink = { href: 'listHref' };

                beforeEach(() => {
                    mockAdapter.onPost(scenario.action.link.href, scenario.action.todo)
                        .reply(201, {
                            _links: {
                                list: listLink,
                            },
                        });
                });

                it('gets the list', (done) => {
                    store.dispatch(scenario.action);

                    setTimeout(() => {
                        expect(capturedActions).toContainEqual({
                            type: ActionTypes.GET_LIST_REQUEST_ACTION,
                            link: listLink,
                        });
                        done();
                    });
                });
            });

            describe('on error', () => {
                const errors = {
                    fieldErrors: [
                        {
                            field: 'task',
                            message: 'is taken',
                        },
                    ],
                    globalErrors: [],
                };

                beforeEach(() => {
                    mockAdapter.onPost(scenario.action.link.href, scenario.action.todo)
                        .reply(400, errors);
                });

                it('stores the errors', (done) => {
                    store.dispatch(scenario.action);

                    setTimeout(() => {
                        expect(capturedActions).toContainEqual({
                            type: ActionTypes.STORE_ERRORS_ACTION,
                            errors,
                        });
                        done();
                    });
                });
            });
        });
    });

    type EmptyApplicationAction = ApplicationAction & { link: Link };
    const emptyActionScenarios: Array<{ description: string, action: EmptyApplicationAction }> = [
        {
            description: 'todo completion',
            action: {
                type: ActionTypes.COMPLETE_TODO_REQUEST_ACTION,
                link: { href: 'completeHref' },
            },
        },
        {
            description: 'moving todos',
            action: {
                type: ActionTypes.MOVE_TODO_REQUEST_ACTION,
                link: { href: 'moveHref' },
            },
        },
        {
            description: 'pulling todos',
            action: {
                type: ActionTypes.PULL_TODOS_REQUEST_ACTION,
                link: { href: 'pullHref' },
            },
        },
        {
            description: 'escalating todos',
            action: {
                type: ActionTypes.ESCALATE_TODOS_REQUEST_ACTION,
                link: { href: 'escalateHref' },
            },
        },
    ];

    emptyActionScenarios.map((scenario) => {
        describe(scenario.description, () => {
            it('gets the list on success', (done) => {
                store.dispatch(scenario.action);

                const listLink = { href: 'listHref' };
                mockAdapter.onPost(scenario.action.link.href)
                    .reply(202, {
                        _links: {
                            list: listLink,
                        },
                    });

                setTimeout(() => {
                    expect(capturedActions).toContainEqual({
                        type: ActionTypes.GET_LIST_REQUEST_ACTION,
                        link: listLink,
                    });
                    done();
                });
            });
        });
    });

    describe('updating todos', () => {
        const action: ApplicationAction = {
            type: ActionTypes.UPDATE_TODO_REQUEST_ACTION,
            link: { href: 'updateHref' },
            todo: { task: 'someTask' },
        };

        it('clears errors', () => {
            store.dispatch(action);

            expect(capturedActions).toContainEqual({
                type: ActionTypes.CLEAR_ERRORS_ACTION,
            });
        });

        describe('on success', () => {
            const listLink = { href: 'listHref' };

            beforeEach(() => {
                mockAdapter.onPut(action.link.href, action.todo)
                    .reply(202, {
                        _links: {
                            list: listLink,
                        },
                    });
            });

            it('gets the list', (done) => {
                store.dispatch(action);

                setTimeout(() => {
                    expect(capturedActions).toContainEqual({
                        type: ActionTypes.GET_LIST_REQUEST_ACTION,
                        link: listLink,
                    });
                    done();
                });
            });
        });

        describe('on error', () => {
            const errors = {
                fieldErrors: [
                    {
                        field: 'task',
                        message: 'is taken',
                    },
                ],
                globalErrors: [],
            };

            beforeEach(() => {
                mockAdapter.onPut(action.link.href, action.todo)
                    .reply(400, errors);
            });

            it('stores the errors', (done) => {
                store.dispatch(action);

                setTimeout(() => {
                    expect(capturedActions).toContainEqual({
                        type: ActionTypes.STORE_ERRORS_ACTION,
                        errors,
                    });
                    done();
                });
            });
        });
    });
});
