import axios from 'axios';

const api = axios.create({
    baseURL: "http://192.168.0.156:3333"
    // baseURL: "localhost:3333"
    // baseURL: "127.0.0.1:3333"
});

export default api;