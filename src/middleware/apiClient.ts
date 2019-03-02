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

export function perform<Command extends Commands>(
    httpMethod: string,
    command: Command,
    link: Link,
    onSuccess: (response: SuccessResponses[Command]) => void,
    // tslint:disable-next-line:no-console
    onError: (errorResponse: ErrorResponse) => void = (errorResponse) => console.log(errorResponse),
    httpHeaders = {},
    request?: Requests[Command],
): void {
    const requestConfig = { method: httpMethod, url: link.href, data: request, headers: httpHeaders };
    client.request(requestConfig)
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
