import {Action, applyMiddleware, combineReducers, compose, createStore} from "redux";
import contentReducer from "./Content-reducer";
import authReducer from "./Auth-reducer";
import thunkMiddleware, {ThunkAction} from "redux-thunk";
import { reducer as formReducer} from 'redux-form'
import appReducer from "./App-reducer";


let rootReducer = combineReducers({
    contentPage: contentReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer
});
export type InferActionsTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never
type RootReducerType = typeof rootReducer; // (globalstate: AppStateType) => AppStateType
export type AppStateType = ReturnType<RootReducerType>
export type BaseThunkType<A extends Action = Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>

//так создаем стор чтобы подключить расширение redux devtools
// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)));
// @ts-ignore
window.__store__ = store;
export default store;