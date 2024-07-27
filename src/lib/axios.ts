import axios from "axios";

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL });

api.interceptors.request.use( config => {
    const bearerToken = localStorage.getItem('tknWeb');
    if( bearerToken ){
        config.headers.Authorization = `Bearer ${bearerToken}`;
    };
    return config;
});

export { api };