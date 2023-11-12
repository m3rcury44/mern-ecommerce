import React from 'react';
import classes from './SecurityButtons.module.scss'
import {Link} from "react-router-dom";
import MyButton from "../my-button/MyButton";

const SecurityButtons = () => {
    return (
        <div className={classes.buttons}>
            <Link className={classes.joinButton} to='/security/register'>
                <MyButton>Join now</MyButton>
            </Link>
            <Link className={classes.logInButton} to='/security/login'>
                <MyButton>Log in</MyButton>
            </Link>
        </div>
    );
};

export default SecurityButtons;