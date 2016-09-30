import axios from 'axios';

let client = axios.create();

client.defaults.baseURL = 'http://localhost:8080';
client.defaults.headers = {
    'Content-Type': 'application/json'
}

export function fetchData(url, configs) {
    return client.get(url, configs)
        .then((response) => ({response}))
        .catch((error) => ({error}));
}

export function postData(url, data, configs) {
    return client.post(url, data, configs)
        .then((response) => ({response}))
        .catch((error) => ({error}));
}