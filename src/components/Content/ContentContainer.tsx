import React from 'react';
import Content from "./Content";
import {connect} from "react-redux";
import {getUserProfile, saveProfile} from '../../redux/Content-reducer';
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {useMatch} from "react-router-dom";

import { AppStateType } from '../../redux/redux-store';
import { ProfileType } from '../../types/types';

type MapPropsType = ReturnType<typeof mapStateToProps>

type DispatchPropsType = {
    getUserProfile: (userId: number) => void
    getStatus: (userId: number) => void
    updateStatus: (status: string) => void
    savePhoto: (file: File) => void
    saveProfile: (profile: ProfileType) => Promise<any>
}

type PathParamsType = {
    userId: string
    match: any
    profile: ProfileType | null
    isOwner: boolean

}

type PropsType = MapPropsType & DispatchPropsType & PathParamsType;

class ContentContainer extends React.Component<PropsType> {

    refreshProfile() {

        let userId = this.props.match ? this.props.match.params.userId : this.props.authorizedUserId;
        this.props.getUserProfile(userId);

    }

    componentDidMount() {
        this.refreshProfile();
    }

    componentDidUpdate(prevProps: PropsType, prevState: PropsType) {
        if (this.props.match != prevProps.match) {
            this.refreshProfile();
        }
    }

    render() {
        return (
            <Content {...this.props}
                     profile = {this.props.profile}
                     isOwner = {!this.props.match}/> )
    }
}

const ProfileURLMatch = (props: PropsType) => {
    const match = useMatch('/profile/:userId/');
    return <ContentContainer {...props} match = {match} />;
}

const mapStateToProps = (state: AppStateType) => ({
    profile: state.contentPage.profile,
    authorizedUserId: state.auth.id, /*тут мы берем наш userId */
    isAuth: state.auth.isAuth /*тут мы берем инфу авторизованы или нет */
})


export default compose<React.ComponentType>(
    connect(mapStateToProps, {getUserProfile, saveProfile}),
    withAuthRedirect,
)(ProfileURLMatch)






