import React from 'react';
import classes from './Header.module.css';
import {NavLink} from "react-router-dom";

export type MapPropsType = {
    isAuth: boolean
    login: string | null
}

export type DispatchPropsType = {
    logout: () => void
}

let Header: React.FC<MapPropsType & DispatchPropsType> = (props) => {
    return <header className={classes.header}>

        <div className={classes.loginBlock}>
            {props.isAuth
                ? <div>{props.login} - <button onClick={props.logout}>Log out</button></div>
                : <NavLink to="/login"><h2 className={classes.loginColor}>Login</h2></NavLink>}
        </div>
    </header>
}

export default Header;