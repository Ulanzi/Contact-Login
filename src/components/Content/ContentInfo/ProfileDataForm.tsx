import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Input} from "../../common/FormsControls/FormsControls";
import classes from './ContentInfo.module.css';
import style from "../../common/FormsControls/FormsControls.module.css";
import { ProfileType } from "../../../types/types";

type PropsType = {
    profile: ProfileType
}

const ProfileDataForm: React.FC<InjectedFormProps<ProfileType, PropsType> & PropsType> = ({handleSubmit, profile, error}) => {
    return <form onSubmit={handleSubmit} >
        <div >
        <div > <button>save</button> </div>
        {error && <div className={style.formSummaryError}> {error} </div>} {/*если в пропсах есть ошибка то мы покажем props.error*/}

        <div>
            <b>Contacts</b> : {Object.keys(profile.contacts).map(key => {
            return <div key={key} className={classes.contact}>
            <b>{key}: <Field placeholder={key} name={"contacts." + key} component={Input}/></b>
            </div>
        })} {/*Object.keys пробегается по объекту contacts и мы мапим компоненту Contact на базе каждого значения*/}
        </div>
        </div>
    </form>
}

const ProfileDataFormReduxForm = reduxForm<ProfileType, PropsType>({form: 'edit-profile'}) (ProfileDataForm)

export default ProfileDataFormReduxForm;