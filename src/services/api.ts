import axios from "axios";
import { getAccessToken } from "@/services/token.service"

export const api = axios.create({
    baseURL: "http://localhost:8000",
    withCredentials: true,
});

api.interceptors.request.use((config) => {
    const accessToken = getAccessToken();

    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
});