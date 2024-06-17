import axios, { AxiosResponse } from "axios";
import { notification } from "Utils/Notification";
import { LoginResponse } from "models/auth/LoginResponse";
import store from "Redux/store";
import { logoutRequest } from "modules/auth";
import { BASE_URL } from "Api/BaseApi";

//export const ATTENDANCE_URL = "https://fingerdev.dock8.66bit.ru";
export const ATTENDANCE_URL = "https://localhost:44323";

const attendanceApi = axios.create({
    withCredentials: true,
    baseURL: `${ATTENDANCE_URL}/api`,
});

attendanceApi.interceptors.request.use(config => {
    const token = localStorage.getItem("@ACCESS_TOKEN");
    config.headers = {
        ["accept"]: "application/json",
        ["Authorization"]: `Bearer ${token}`,
        ["Content-Type"]: "application/json-patch+json",
    };
    return config;
});

attendanceApi.interceptors.response.use(
    config => {
        return config;
    },
    async error => {
        const originalRequest = error.config;

        if (!error.response) {
            notification(null, error.message);
            return;
        }

        if (error.response.status !== 401) {
            if (error.response.status >= 500) {
                notification(`Код: ${error.response.status}`, "Ошибка сервера");
                return;
            }

            if (error.response.status === 403) {
                notification("Данное действие вам недоступно");
                return;
            }

            if (typeof error.response.data === "object") {
                const data = error.response.data[0];
                if (data && data.length) {
                    if (typeof data[0] === "string") {
                        // notification("Ошибка", data[0]);
                    }
                }
            }
            return;
        }

        if (error.response.status === 401 && !originalRequest._isRetry) {
            originalRequest._isRetry = true;
            try {
                const response: AxiosResponse<LoginResponse> = await axios.post(`${BASE_URL}/auth/refresh`, {
                    withCredentials: true,
                });

                localStorage.setItem("@ACCESS_TOKEN", response.data.accessToken);
                return attendanceApi.request(originalRequest);
            } catch (error) {
                console.log(error);
            }
        }

        if (error.response.status === 401 && originalRequest._isRetry) {
            store.dispatch(logoutRequest());
            localStorage.removeItem("@ACCESS_TOKEN");
        }
    }
);

export default attendanceApi;