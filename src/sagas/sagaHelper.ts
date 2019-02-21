import axios, { AxiosRequestConfig } from 'axios';
import {
    Commands,
    ErrorResponse,
    errorResponseValidator,
    Requests,
    SuccessResponses,
    successResponseValidators,
} from '../api/api';
import { Link } from '../api/api';

export const client = axios.create();

client.defaults.headers = {
    'Content-Type': 'application/json',
};

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

export function postCommand<Command extends Commands>(
    command: Command,
    link: Link,
    request: Requests[Command],
    onSuccess: (response: SuccessResponses[Command]) => void,
    // tslint:disable-next-line:no-console
    onError: (errorResponse: ErrorResponse) => void = (errorResponse) => console.log(errorResponse)): void {
    client.post(link.href, request)
        .then((successResponse) => {
            const validation = successResponseValidators[command].decode(successResponse.data);
            if (validation.isRight()) {
                onSuccess(validation.value);
            }
        })
        .catch(({ response: errorResponse }) => {
            const validation = errorResponseValidator.decode(errorResponse.data);
            if (validation.isRight()) {
                onError(validation.value);
            }
        });
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
