import * as io from 'io-ts';
import { LoginInfo, SignupInfo } from './session';

export interface Link {
    href: string;
}

export type Commands =
    | 'signup'
    | 'login';

export const successResponseValidators = {
    signup: io.interface({
        session: io.interface({
            token: io.string,
        }),
        _links: io.interface({
            root: io.interface({
                href: io.string,
            }),
        }),
    }),
    login: io.interface({
        session: io.interface({
            token: io.string,
        }),
        _links: io.interface({
            root: io.interface({
                href: io.string,
            }),
        }),
    }),
};

export interface Requests {
    signup: SignupInfo;
    login: LoginInfo;
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
