import {profileAPI} from "../api/Api";
import {stopSubmit} from "redux-form";
import { BaseThunkType, InferActionsTypes } from "./redux-store";
import actions, { FormAction } from "redux-form/lib/actions";
import {ProfileType} from "../types/types";

const SET_USER_PROFILE = 'SET_USER_PROFILE';

type ContactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}

/*initialState это стартовый state*/
let initialState = {
    profile: null as ProfileType | null,

};
export type InitialStateType = typeof initialState

const contentReducer = (state = initialState, action: any): InitialStateType => {

    switch (action.type) {

        case SET_USER_PROFILE: {
            return {
                ...state, profile: action.profile};
        }

        default:
            return state;
    }
}
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType | FormAction>
type SetUserProfileActionType = {
    type: typeof SET_USER_PROFILE
    profile: ProfileType
}

export const setUserProfile = (profile: ProfileType): SetUserProfileActionType => ({type: SET_USER_PROFILE, profile})

/*это thunk*/
export const getUserProfile = (userId: number): ThunkType => async (dispatch: any) => {
    let response = await profileAPI.getProfile(userId);
    dispatch(setUserProfile(response.data)); /*диспатчим не сам actioncreator а его вызов*/
    }


    /*это thunk для отправки редактированного профайла*/
export const saveProfile = (profile: ProfileType): ThunkType => async (dispatch: any, getState: any) => {
    const userId = getState().auth.id;

    const response = await profileAPI.saveProfile(profile);

    if (response.data.resultCode === 0) {
       dispatch(getUserProfile(userId)); /*диспатчим не сам actioncreator а его вызов*/
    } else {
        dispatch(stopSubmit('edit-profile', {_error: response.data.messages[0]}));
        return Promise.reject(response.data.messages[0]) /*ошибка при нажатии на save из промиса из onSubmit из ContentInfo если неверный контакт*/
    }
}

export default contentReducer;