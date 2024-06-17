import { TRegistrationForm } from "models/auth/RegistrationForm";
import baseApi from "Api/BaseApi";
import { TLoginForm } from "models/auth/LoginForm";
import { AxiosResponse } from "axios";
import { LoginResponse } from "models/auth/LoginResponse";
import { ProfilePasswordRecovery } from "models/profile/ProfileTypes";
import { BasicInfoResponse } from "models/auth/BasicInfo";

const baseUrl = "/auth";
const profileBaseUrl = "/account/user-profile";

export const registration = (data: TRegistrationForm) => {
    return baseApi.post("/registration", data);
};

export const login = (data: TLoginForm): Promise<AxiosResponse<LoginResponse>> => {
    return baseApi.post(`${baseUrl}/login`, data);
};

export const loginWithGitlab = (data: { code: string; redirectUri: string }) => {
    return baseApi.post(`${baseUrl}/gitlab-code-auth`, data);
};

export const refresh = (): Promise<AxiosResponse<LoginResponse>> => {
    return baseApi.get(`${baseUrl}/refresh`);
};

export const logout = (): Promise<{ token: boolean }> => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                token: true,
            });
        }, 300);
    });
};

export const changePassword = (data: ProfilePasswordRecovery): Promise<AxiosResponse<void>> => {
    return baseApi.post(`${baseUrl}/change-password`, data);
};

export const getBasicInfoProfile = (): Promise<AxiosResponse<BasicInfoResponse>> => {
    const url = `${profileBaseUrl}/basicinfo`;
    return baseApi.get(url);
};
