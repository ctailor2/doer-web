import axios, { AxiosRequestConfig } from 'axios'
import * as io from 'io-ts'
import { SignupInfo, Link } from '../actions/sessionActions';

let client = axios.create();

client.defaults.headers = {
    'Content-Type': 'application/json'
}

type Commands = 'signup'

const SignupResult = io.interface({
    session: io.interface({
        token: io.string,
    }),
    _links: io.interface({
        root: io.interface({
            href: io.string,
        })
    })
})

const ErrorResponseIO = io.interface({
    fieldErrors: io.array(io.interface({
        field: io.string,
        message: io.string,
    })),
    globalErrors: io.array(io.interface({
        message: io.string,
    }))
})

const responseValidators = {
    signup: SignupResult,
    error: ErrorResponseIO
}

type Requests = {
    signup: SignupInfo,
}

type SuccessResponses = {
    signup: io.TypeOf<typeof SignupResult>
}

type ErrorResponse = io.TypeOf<typeof ErrorResponseIO>;

type ApiError = {
    error: any
}

export function fetchData(url: string, configs?: AxiosRequestConfig) {
    return client.get(url, configs)
        .then((response) => ({ response }))
        .catch((error) => ({ error }));
}

export function postData(url: string, data?: any, configs?: AxiosRequestConfig) {
    return client.post(url, data, configs)
        .then((response) => ({ response }))
        .catch((error) => ({ error }));
}

export function postCommand<Command extends Commands>(command: Command, link: Link, request: Requests[Command], onSuccess: (response: SuccessResponses[Command]) => void, onError: (errorResponse: ErrorResponse) => void = (errorResponse) => console.log(errorResponse)): void {
    client.post(link.href, request)
        .then((successResponse) => {
            const validation = responseValidators[command].decode(successResponse.data)
            if (validation.isRight()) {
                onSuccess(validation.value);
            }
        })
        .catch(({response: errorResponse}) => {
            const validation = responseValidators.error.decode(errorResponse.data)
            if (validation.isRight()) {
                onError(validation.value);
            }
        })
}

export function deleteData(url: string, configs?: AxiosRequestConfig) {
    return client.delete(url, configs)
        .then((response) => ({ response }))
        .catch((error) => ({ error }));
}

export function putData(url: string, data?: any, configs?: AxiosRequestConfig) {
    return client.put(url, data, configs)
        .then((response) => ({ response }))
        .catch((error) => ({ error }));
}