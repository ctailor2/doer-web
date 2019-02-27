import * as io from 'io-ts';
import { LoginInfo, SignupInfo } from './session';
import { Todo } from './todo';

export interface Link {
    href: string;
}

export type Commands =
    | 'signup'
    | 'login'
    | 'baseResources'
    | 'rootResources'
    | 'todoResources'
    | 'historyResources'
    | 'list'
    | 'completedList'
    | 'unlock'
    | 'deleteTodo'
    | 'createTodo'
    | 'displaceTodo'
    | 'completeTodo'
    | 'moveTodo'
    | 'pullTodo'
    | 'escalateTodo'
    | 'updateTodo';

const linkValidator = io.interface({
    href: io.string,
});

const todoActionResponseValidator = io.interface({
    _links: io.interface({
        list: linkValidator,
    }),
});

export const successResponseValidators = {
    signup: io.interface({
        session: io.interface({
            token: io.string,
        }),
        _links: io.interface({
            root: linkValidator,
        }),
    }),
    login: io.interface({
        session: io.interface({
            token: io.string,
        }),
        _links: io.interface({
            root: linkValidator,
        }),
    }),
    baseResources: io.interface({
        _links: io.interface({
            login: linkValidator,
            signup: linkValidator,
        }),
    }),
    rootResources: io.interface({
        _links: io.interface({
            todoResources: linkValidator,
            historyResources: linkValidator,
        }),
    }),
    todoResources: io.interface({
        _links: io.interface({
            list: linkValidator,
        }),
    }),
    historyResources: io.interface({
        _links: io.interface({
            completedList: linkValidator,
        }),
    }),
    list: io.interface({
        list: io.interface({
            name: io.string,
            deferredName: io.string,
            todos: io.array(io.interface({
                task: io.string,
            })),
            deferredTodos: io.array(io.interface({
                task: io.string,
            })),
            unlockDuration: io.number,
            _links: io.intersection([
                io.type({
                    createDeferred: linkValidator,
                }),
                io.partial({
                    create: io.union([linkValidator, io.undefined]),
                    pull: io.union([linkValidator, io.undefined]),
                    displace: io.union([linkValidator, io.undefined]),
                    escalate: io.union([linkValidator, io.undefined]),
                    unlock: io.union([linkValidator, io.undefined]),
                }),
            ]),
        }),
    }),
    completedList: io.interface({
        list: io.interface({
            todos: io.array(io.interface({
                task: io.string,
                completedAt: io.string,
            })),
        }),
    }),
    unlock: todoActionResponseValidator,
    deleteTodo: todoActionResponseValidator,
    createTodo: todoActionResponseValidator,
    updateTodo: todoActionResponseValidator,
    displaceTodo: todoActionResponseValidator,
    completeTodo: todoActionResponseValidator,
    moveTodo: todoActionResponseValidator,
    pullTodo: todoActionResponseValidator,
    escalateTodo: todoActionResponseValidator,
};

export interface Requests {
    signup: SignupInfo;
    login: LoginInfo;
    baseResources: undefined;
    rootResources: undefined;
    todoResources: undefined;
    historyResources: undefined;
    list: undefined;
    completedList: undefined;
    unlock: undefined;
    deleteTodo: undefined;
    createTodo: Todo;
    displaceTodo: Todo;
    updateTodo: Todo;
    completeTodo: undefined;
    moveTodo: undefined;
    pullTodo: undefined;
    escalateTodo: undefined;
}

export type SuccessResponses = {
    [Command in Commands]: io.TypeOf<typeof successResponseValidators[Command]>
};

export const errorResponseValidator = io.interface({
    fieldErrors: io.array(io.interface({
        field: io.string,
        message: io.string,
    })),
    globalErrors: io.array(io.interface({
        message: io.string,
    })),
});

export type ErrorResponse = io.TypeOf<typeof errorResponseValidator>;
