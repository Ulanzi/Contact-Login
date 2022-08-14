import axios from "axios";
import {ProfileType} from "../types/types";

export enum ResultCodesEnum {
    Success = 0,
    Error = 1
}

type GetCaptchaUrlResponseType = {
    url: string
}

 type APIResponseType<D = {}, RC = ResultCodesEnum> = {
    data: D
    messages: Array<string>
    resultCode: RC
}

/*instance это базовая настройка запроса*/
export const instance = axios.create({

    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: { "api-key" : "237de4a2-60b4-4d3d-a09d-4c3e2f0c5c52"}

});

export const profileAPI = {
    getProfile(userId: number) {
        return instance.get<ProfileType>(`profile/` + userId);
    },

    saveProfile(profile: ProfileType){
        return instance.put<APIResponseType>(`profile`, profile);
    },

}

type MeResponseDataType = {
    id: number
    email: string
    login: string
}

export const authAPI = {
    me() {
        return instance.get<APIResponseType<MeResponseDataType>>(`auth/me`);      /*для get и delete запроса нельза отправлять данные*/
    },
    login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
        return instance.post(`auth/login`, {email, password, rememberMe, captcha});    /*для post и put можно отпр данные например email, password*/
    },
    logout() {
        return instance.delete(`auth/login`);
    }
}

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get<GetCaptchaUrlResponseType>(`security/get-captcha-url`);      /*для get и delete запроса нельза отправлять данные*/
    }
}


