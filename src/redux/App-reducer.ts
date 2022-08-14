import {getAuthUserData} from "./Auth-reducer";

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS'; //создаем константы type что бы не ошибиться с наименованиями

export type InitialStateType = {
    initialized: boolean
}

/*initialState это стартовый state*/
let initialState: InitialStateType = {
    initialized: false
};

const appReducer = (state:InitialStateType = initialState, action: any): InitialStateType=> {

    switch (action.type) {

        case INITIALIZED_SUCCESS:
            return  {
                ...state,
                initialized: true
            }

            default:
            return state;
    }
}

type InitializedSuccessActionType = {
    type: typeof INITIALIZED_SUCCESS
}

export const initializedSuccess = (): InitializedSuccessActionType => ({ type: INITIALIZED_SUCCESS})

/*это thunk*/
export const initializeApp = () => (dispatch: any) => {
    let promise =  dispatch(getAuthUserData());

Promise.all ([promise])
    .then( () => { dispatch (initializedSuccess()) })  /*когда getAuthUserData получит результат запустится initializedSuccess */

}

export default appReducer;