import axios from 'axios';

let client = axios.create();

client.defaults.baseURL = 'http://localhost:8080';
client.defaults.headers = {
    'Content-Type': 'application/json'
}

export function fetchData(url) {
    return client.get(url)
        .then((response) => ({response}))
        .catch((error) => ({error}));
}

export function postData(url, data) {
    return client.post(url, data)
        .then((response) => ({response}))
        .catch((error) => ({error}));
}