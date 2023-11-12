import React from 'react';
import classes from './NotAuth.module.scss'
import SecurityButtons from "../../UI/buttons/security-buttons/SecurityButtons";

const NotAuth = () => {
    return (
        <section className={classes.notAuth}>
            You are not authorized
            <SecurityButtons/>
        </section>
    );
};

export default NotAuth;