import React from 'react';
import {Link, useLocation} from "react-router-dom";
import classes from './Breadcrumbs.module.scss'

const Breadcrumbs = () => {

    const location = useLocation()

    let currentLink = ''

    const crumbs = location.pathname
        .split('/')
        .filter(crumb => crumb !== '')
        .map(crumb => {
                currentLink += `/${crumb}`

                return (
                    <li className={classes.crumb} key={crumb}>
                        <Link to={currentLink}>{crumb}</Link>
                    </li>
                )
            }
        )

    return (
        <nav className={classes.breadcrumbs}>
            <ul>
                <li className={classes.crumb}>
                    <Link to='/'>home</Link>
                </li>
                {crumbs}
            </ul>
        </nav>
    );
};

export default Breadcrumbs;