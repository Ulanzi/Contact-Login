import {authAPI, securityAPI} from "../api/Api";
import {stopSubmit} from "redux-form";


const SET_USER_DATA = 'auth/SET_USER_DATA'; //создаем константы type что бы не ошибиться с наименованиями и добавляем auth/ для уникальности
const GET_CAPTCHA_URL_SUCCESS = 'auth/GET_CAPTCHA_URL_SUCCESS';

export type InitialStateType2 = {
    id: number | null
    email: string | null
    login: string | null
    isAuth: boolean
    captchaUrl: string | null
}

export type InitialStateType = typeof initialState;

/*initialState это стартовый state*/
let initialState = {
    id: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false as boolean,
    captchaUrl: null as string | null
};

const authReducer = (state = initialState, action: any): InitialStateType => {

    switch (action.type) {

        /*payload раньше назывался data*/
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload
            }
        case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                ...action.payload
            }

        default:
            return state;
    }
}

type SetAuthUserDataActionPayloadType = {
    id: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}

type SetAuthUserDataActionType = {
    type: typeof SET_USER_DATA,
    payload: SetAuthUserDataActionPayloadType
}

export const setAuthUserData = (id: number | null, email: string | null, login: string | null, isAuth: boolean): SetAuthUserDataActionType => ({
    type: SET_USER_DATA,
    payload: {id, email, login, isAuth}
})

type GetCaptchaUrlSuccessActionType = {
    type: typeof GET_CAPTCHA_URL_SUCCESS,
    payload: {captchaUrl: string}
}

export const getCaptchaUrlSuccess = (captchaUrl: string): GetCaptchaUrlSuccessActionType => ({
    type: GET_CAPTCHA_URL_SUCCESS,
    payload: {captchaUrl}
})

/*это thunk*/
/*тут мы отправляем запрос на me и если мы зологинены то возвр resultCode === 0
и мы сетаем наш state с данными пользователя и меняется isAuth: false на isAuth: true*/
export const getAuthUserData = () => async (dispatch: any) => {
    let response = await authAPI.me();
    if (response.data.resultCode === 0) {
        let {id, login, email} = response.data.data;
        dispatch(setAuthUserData(id, email, login, true));/*диспатчим не сам actioncreator а его вызов*/
    }
}

/*это thunk для логинизации*/
export const login = (email: string, password: string, rememberMe: boolean, captcha: any) => async (dispatch: any) => {

    let response = await authAPI.login(email, password, rememberMe, captcha);

        if (response.data.resultCode === 0) {
            // success, get auth data
            dispatch(getAuthUserData()); /*диспатчим не сам actioncreator а его вызов и если ответ будет с ошибкой запустится stopSubmit*/
        } else {
            if (response.data.resultCode === 10) {
                dispatch(getCaptchaUrl())
            }
            let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error";

            /*тут указываем какую форму мы стопаем и указываем ошибку на все поля с помощью _email*/
            dispatch(stopSubmit('login', {_error: message}));
        }
}

/*это thunk для captcha*/
export const getCaptchaUrl = () => async (dispatch: any) => {
    const response = await securityAPI.getCaptchaUrl();
    const captchaUrl = response.data.url;
        dispatch(getCaptchaUrlSuccess(captchaUrl));/*диспатчим не сам actioncreator а его вызов*/

}

/*это thunk для вылогинизации*/
export const logout = () => async (dispatch: any) => {
    let response = await authAPI.logout();
    if (response.data.resultCode === 0) {
            dispatch(setAuthUserData(null, null, null, false));/*диспатчим не сам actioncreator а его вызов*/
        }
}

export default authReducer;