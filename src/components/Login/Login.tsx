import React from 'react';
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Input} from "../common/FormsControls/FormsControls";
import {required} from "../../Utils/validators/validators";
import {connect} from "react-redux";
import {login} from "../../redux/Auth-reducer";
import {Navigate} from "react-router-dom";
import style from "./../common/FormsControls/FormsControls.module.css"
import { AppStateType } from '../../redux/redux-store';

type LoginFormOwnProps = {
    captchaUrl: string | null
}

export type LoginFormValuesType = {
    captcha: string
    rememberMe: boolean
    password: string
    email: string
}

/*деструктуризация вместо props пишем что нам нужно*/
const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps>
    = ({handleSubmit, error, captchaUrl}) => {
    debugger
    return (
        <form onSubmit={handleSubmit}>
            <div>
                Здравствуйте!
            </div>
            <div className={style.loginPadding}>
                Для входа на сайт, пожалуйста используйте следущие данные:
            </div>
            <div>
                Email:  serj.molotok@gmail.com
            </div>
            <div>
                Password:  yH565vD
            </div>
            <div className={style.formPadding}>
                <Field placeholder={"Email"} validate={[required]} name={"email"} component={Input}/> {/*используем кастомный инпут*/}
            </div>
            <div>
                <Field placeholder={"Password"} validate={[required]} name={"password"} component={Input}/>
            </div>
            <div>
                <Field type={"checkbox"} name={"rememberMe"} component={Input}/> remember me
            </div>
            <div> {captchaUrl && <img src={captchaUrl} /> } </div>
            <div> {captchaUrl &&  <Field placeholder={"Symbols from image"} validate={[required]} name={"captcha"} component={Input}/>} </div>
            {error && <div className={style.formSummaryError}> {error} </div>} {/*если в пропсах есть ошибка то мы покажем props.error*/}
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({form: 'login'}) (LoginForm)

type MapStatePropsType = {
    captchaUrl: string | null
    isAuth: boolean
}
type MapDispatchPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}

/*onSubmit сюда приходят все собранные данные из форм*/
const Login: React.FC<MapStatePropsType & MapDispatchPropsType> = (props) => {
    const onSubmit = (formData: LoginFormValuesType) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha);
    }
    /*если в пропсах придет что мы залогинены тогда мы делаем редирект*/
    if (props.isAuth) {
        return  <Navigate replace to="/profile" />
    }
    /* а если в пропсах придет что мы НЕ залогинены тогда мы отправимся в поле логинизации*/
    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
    </div>
}

const mapStateToProps = (state: AppStateType) => ({
isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl
})

export default connect (mapStateToProps,{login}) (Login);