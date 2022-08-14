import React from 'react';
import { ProfileType } from '../../types/types';
import ContentInfo from "./ContentInfo/ContentInfo";

type PropsType = {
    profile: ProfileType | null
    isOwner: boolean
    saveProfile: (profile: ProfileType) => Promise<any>
}

const Content:React.FC<PropsType> = (props) => {
    return (
    <div>

        <ContentInfo isOwner={props.isOwner}
                     profile={props.profile}
                     saveProfile={props.saveProfile}/>

    </div>
  )
}

export default Content;