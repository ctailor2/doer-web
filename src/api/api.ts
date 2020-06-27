import * as io from 'io-ts';
import { LoginInfo, SignupInfo } from './session';
import { TodoForm } from './todo';
import { ListForm } from './list';

export interface Link {
    href: string;
}

export type Commands =
    | 'signup'
    | 'login'
    | 'baseResources'
    | 'rootResources'
    | 'listResources'
    | 'historyResources'
    | 'list'
    | 'lists'
    | 'completedList'
    | 'unlock'
    | 'deleteTodo'
    | 'createTodo'
    | 'displaceTodo'
    | 'completeTodo'
    | 'moveTodo'
    | 'pullTodo'
    | 'escalateTodo'
    | 'updateTodo'
    | 'createList';

const linkValidator = io.interface({
    href: io.string,
});

const listValidator = io.interface({
    profileName: io.string,
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
});

const todoActionResponseValidator = io.interface({
    _links: io.interface({
        list: linkValidator,
    }),
    list: listValidator,
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
            listResources: linkValidator,
            historyResources: linkValidator,
        }),
    }),
    listResources: io.interface({
        _links: io.interface({
            list: linkValidator,
            lists: linkValidator,
        }),
    }),
    historyResources: io.interface({
        _links: io.interface({
            completedList: linkValidator,
        }),
    }),
    list: io.interface({
        list: listValidator,
        _links: io.interface({
            self: linkValidator,
        }),
    }),
    lists: io.interface({
        lists: io.array(io.interface({
            name: io.string,
        })),
    }),
    completedList: io.interface({
        list: io.interface({
            todos: io.array(io.interface({
                task: io.string,
                completedAt: io.string,
            })),
        }),
    }),
    unlock: io.interface({
        _links: io.interface({
            list: linkValidator,
        }),
    }),
    deleteTodo: todoActionResponseValidator,
    createTodo: todoActionResponseValidator,
    updateTodo: todoActionResponseValidator,
    displaceTodo: todoActionResponseValidator,
    completeTodo: todoActionResponseValidator,
    moveTodo: todoActionResponseValidator,
    pullTodo: todoActionResponseValidator,
    escalateTodo: todoActionResponseValidator,
    createList: io.interface({
        _links: io.interface({
            lists: linkValidator,
        }),
    }),
};

export interface Requests {
    signup: SignupInfo;
    login: LoginInfo;
    baseResources: undefined;
    rootResources: undefined;
    listResources: undefined;
    historyResources: undefined;
    list: undefined;
    lists: undefined;
    completedList: undefined;
    unlock: undefined;
    deleteTodo: undefined;
    createTodo: TodoForm;
    displaceTodo: TodoForm;
    updateTodo: TodoForm;
    completeTodo: undefined;
    moveTodo: undefined;
    pullTodo: undefined;
    escalateTodo: undefined;
    createList: ListForm;
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
