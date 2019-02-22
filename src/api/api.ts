import * as io from 'io-ts';
import { LoginInfo, SignupInfo } from './session';

export interface Link {
    href: string;
}

export type Commands =
    | 'signup'
    | 'login'
    | 'baseResources'
    | 'rootResources'
    | 'todoResources'
    | 'historyResources';

const linkValidator = io.interface({
    href: io.string,
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
};

export interface Requests {
    signup: SignupInfo;
    login: LoginInfo;
    baseResources: undefined;
    rootResources: undefined;
    todoResources: undefined;
    historyResources: undefined;
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
