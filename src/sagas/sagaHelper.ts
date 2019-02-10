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

const responseValidators = {
    signup: SignupResult
}

type Requests = {
    signup: SignupInfo,
}

type Responses = {
    signup: io.TypeOf<typeof SignupResult>
}

type ApiSuccess<T> = {
    success: T
}

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

export async function postCommand<Command extends Commands>(command: Command, link: Link, request: Requests[Command]): Promise<ApiSuccess<Responses[Command]> | ApiError> {
    return client.post(link.href, request)
        .then((response) => {
            const validation = responseValidators[command].decode(response.data)
            if (validation.isRight()) {
                return { success: validation.value }
            }
        })
        .catch((error) => ({ error }))
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