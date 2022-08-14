import React, {useState} from 'react';
import classes from './ContentInfo.module.css';
import Preloader from "../../common/Preloader/Preloader";
import ProfileDataForm from "./ProfileDataForm";
import {ContactsType, ProfileType } from '../../../types/types';

type PropsType = {
    profile: ProfileType | null

    isOwner: boolean

    saveProfile: (profile: ProfileType) => Promise<any>
}

const ContentInfo: React.FC<PropsType> = (props) => {

    let [editMode, setEditMode] = useState(false); /*с помощью хука создоем LocalState для editMode*/

    if (!props.profile) {
        return <Preloader/>
    }

    const onSubmit = (formData: ProfileType) => {
        props.saveProfile(formData).then(
            () => {
                setEditMode(false);
            }
        ) /*при нажатии на кнопку save editMode меняется на false и режим редактирования выключается*/
    }

    return (
        <div>
            <div className={classes.descriptionBlock}>

                {editMode ? <ProfileDataForm initialValues={props.profile} profile={props.profile} onSubmit={onSubmit}/>
                    : <div className={classes.profile}><ProfileData goToEditMode={() => {
                        setEditMode(true)
                    }} profile={props.profile} isOwner={props.isOwner}/></div>}
            </div>
        </div>
    )
}

type ProfileDataPropsType = {
    profile: ProfileType
    isOwner: boolean
    goToEditMode: () => void
}

const ProfileData: React.FC<ProfileDataPropsType> = (props) => {
    return <div>
        {props.isOwner && <div className={classes.buttonEdit}>
            <button onClick={props.goToEditMode}>edit</button>
        </div>}
        <div>
            <b>Full name</b> : {props.profile.fullName}
        </div>
        <div>
            <b>Contacts</b> : {Object.keys(props.profile.contacts).map(key => {
            return <Contact key={key} contactTitle={key} contactValue={props.profile.contacts[key as keyof ContactsType]}/>
        })} {/*Object.keys пробегается по объекту contacts и мы мапим компоненту Contact на базе каждого значения*/}
        </div>
    </div>
}
type ContactsPropsType = {
    contactTitle: string
    contactValue: string
}

const Contact: React.FC<ContactsPropsType> = ({contactTitle, contactValue}) => {
    return <div className={classes.contact}><b>{contactTitle}</b> : {contactValue} </div>
}

export default ContentInfo;