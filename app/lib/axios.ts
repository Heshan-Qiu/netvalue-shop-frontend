require("dotenv").config();

import axios from "axios";

const customAxios = axios.create();

customAxios.interceptors.request.use(
    (config) => {
        config.headers["x-api-key"] = process.env.NEXT_PUBLIC_API_KEY;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default customAxios;
