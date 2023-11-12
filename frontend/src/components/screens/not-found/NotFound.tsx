import React from 'react';
import MyButton from "../../UI/buttons/my-button/MyButton";
import classes from './NotFound.module.scss'
import {Link} from "react-router-dom";

const NotFound = () => {
    return (
        <section className={classes.notFound}>
            <p>Not Found</p>
            <Link to='/'>
                <MyButton>Go back to the main page</MyButton>
            </Link>
        </section>
    );
};

export default NotFound;