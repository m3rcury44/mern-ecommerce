import React, {useState} from 'react';
import classes from "./HamburgerMenu.module.scss";
import {Link, NavLink} from "react-router-dom";
import {useAppSelector} from "../../../hooks/useAppSelector";
import {selectIsAuth} from "../../../store/auth/auth.slice";
import TotalQuantity from "../../UI/total-quantity/TotalQuantity";

const HamburgerMenu = () => {

    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    const data = useAppSelector(state => state.auth.data)

    const isAuth = useAppSelector(selectIsAuth)

    const handleClick = () => {
        setIsSidebarOpen(!isSidebarOpen)
    }

    return (
        <div className={classes.menu}>
            <div
                className={isSidebarOpen ? `${classes.hamburgerMenu} ${classes.open}` : classes.hamburgerMenu}
                onClick={handleClick}
            >
                <span className={classes.hamburgerBar}/>
                <span className={classes.hamburgerBar}/>
                <span className={classes.hamburgerBar}/>
            </div>
            <aside
                className={isSidebarOpen ? `${classes.sidebar} ${classes.active}` : classes.sidebar}
            >
                <div className={classes.blur} onClick={() => setIsSidebarOpen(false)}/>
                <div className={classes.sidebarContent}>
                    <div onClick={() => setIsSidebarOpen(false)}>
                        <div className={classes.auth}>
                            {isAuth
                                ? <>
                                    <Link to='/profile'>
                                        {data?.avatarUrl ?
                                            <img
                                                style={{borderRadius: '50%', border: '1px solid #6f6f6f'}}
                                                src={`${process.env.REACT_APP_API_URL}/uploads/${data?.avatarUrl}`}
                                                alt="avatar"
                                            /> :
                                            <img
                                                src='/images/avatar.svg'
                                                alt="avatar"
                                            />
                                        }
                                    </Link>
                                    <p>Welcome! {data?.name}</p>
                                </>
                                : <>
                                    <Link to='/profile'>
                                        <img src="/images/avatar.svg" alt="avatar"/>
                                    </Link>
                                    <div style={{display: 'flex'}}>
                                        <Link to='/security/login'>
                                            <p>Sign in |&nbsp;</p>
                                        </Link>
                                        <Link to='/security/register'>
                                            <p>Register</p>
                                        </Link>
                                    </div>
                                </>
                            }
                        </div>
                        <ul className={classes.nav}>
                            <li>
                                <NavLink to='/'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                         fill="none">
                                        <path
                                            d="M12 6.19L17 10.69V18.5H15V12.5H9V18.5H7V10.69L12 6.19ZM12 3.5L2 12.5H5V20.5H11V14.5H13V20.5H19V12.5H22L12 3.5Z"
                                            fill="#8B96A5"/>
                                    </svg>
                                    <p>Home</p>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to='/category'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                         fill="none">
                                        <path
                                            d="M4.25 10.5C3.42 10.5 2.75 11.17 2.75 12C2.75 12.83 3.42 13.5 4.25 13.5C5.08 13.5 5.75 12.83 5.75 12C5.75 11.17 5.08 10.5 4.25 10.5ZM4.25 4.5C3.42 4.5 2.75 5.17 2.75 6C2.75 6.83 3.42 7.5 4.25 7.5C5.08 7.5 5.75 6.83 5.75 6C5.75 5.17 5.08 4.5 4.25 4.5ZM4.25 16.5C3.42 16.5 2.75 17.18 2.75 18C2.75 18.82 3.43 19.5 4.25 19.5C5.07 19.5 5.75 18.82 5.75 18C5.75 17.18 5.08 16.5 4.25 16.5ZM7.25 19H21.25V17H7.25V19ZM7.25 13H21.25V11H7.25V13ZM7.25 5V7H21.25V5H7.25Z"
                                            fill="#8B96A5"/>
                                    </svg>
                                    <p>Categories</p>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to='/favorites'>
                                    <TotalQuantity type='favorites'/>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                         fill="none">
                                        <path
                                            d="M16.5 2.82495C14.76 2.82495 13.09 3.63495 12 4.91495C10.91 3.63495 9.24 2.82495 7.5 2.82495C4.42 2.82495 2 5.24495 2 8.32495C2 12.105 5.4 15.185 10.55 19.865L12 21.175L13.45 19.855C18.6 15.185 22 12.105 22 8.32495C22 5.24495 19.58 2.82495 16.5 2.82495ZM12.1 18.375L12 18.475L11.9 18.375C7.14 14.065 4 11.215 4 8.32495C4 6.32495 5.5 4.82495 7.5 4.82495C9.04 4.82495 10.54 5.81495 11.07 7.18495H12.94C13.46 5.81495 14.96 4.82495 16.5 4.82495C18.5 4.82495 20 6.32495 20 8.32495C20 11.215 16.86 14.065 12.1 18.375Z"
                                            fill="#8B96A5"/>
                                    </svg>
                                    <p>Favorites</p>

                                </NavLink>
                            </li>
                            <li>
                                <NavLink to='/cart'>
                                    <TotalQuantity type='cart'/>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                         fill="none">
                                        <path
                                            d="M16.5463 13C17.2963 13 17.9563 12.59 18.2963 11.97L21.8763 5.48C22.2463 4.82 21.7663 4 21.0063 4H6.20634L5.26634 2H1.99634V4H3.99634L7.59634 11.59L6.24634 14.03C5.51634 15.37 6.47634 17 7.99634 17H19.9963V15H7.99634L9.09634 13H16.5463ZM7.15634 6H19.3063L16.5463 11H9.52634L7.15634 6ZM7.99634 18C6.89634 18 6.00634 18.9 6.00634 20C6.00634 21.1 6.89634 22 7.99634 22C9.09634 22 9.99634 21.1 9.99634 20C9.99634 18.9 9.09634 18 7.99634 18ZM17.9963 18C16.8963 18 16.0063 18.9 16.0063 20C16.0063 21.1 16.8963 22 17.9963 22C19.0963 22 19.9963 21.1 19.9963 20C19.9963 18.9 19.0963 18 17.9963 18Z"
                                            fill="#8B96A5"/>
                                    </svg>
                                    <p>Cart</p>

                                </NavLink>
                            </li>
                        </ul>
                        <ul className={classes.nav}>
                            <li>
                                <Link to='/'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                         fill="none">
                                        <path
                                            d="M19 14V18H17V14H19ZM7 14V18H6C5.45 18 5 17.55 5 17V14H7ZM12 1C7.03 1 3 5.03 3 10V17C3 18.66 4.34 20 6 20H9V12H5V10C5 6.13 8.13 3 12 3C15.87 3 19 6.13 19 10V12H15V20H19V21H12V23H18C19.66 23 21 21.66 21 20V10C21 5.03 16.97 1 12 1Z"
                                            fill="#8B96A5"/>
                                    </svg>
                                    <p>Contact us</p>
                                </Link>
                            </li>
                            <li>
                                <Link to='/'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                         fill="none">
                                        <path
                                            d="M12 7V3H2V21H22V7H12ZM6 19H4V17H6V19ZM6 15H4V13H6V15ZM6 11H4V9H6V11ZM6 7H4V5H6V7ZM10 19H8V17H10V19ZM10 15H8V13H10V15ZM10 11H8V9H10V11ZM10 7H8V5H10V7ZM20 19H12V17H14V15H12V13H14V11H12V9H20V19ZM18 11H16V13H18V11ZM18 15H16V17H18V15Z"
                                            fill="#8B96A5"/>
                                    </svg>
                                    <p>About</p>
                                </Link>
                            </li>
                        </ul>
                        <ul style={{borderBottom: 'none'}} className={classes.nav}>
                            <li>
                                <Link to='/'>
                                    <p>User agreement</p>
                                </Link>
                            </li>
                            <li>
                                <Link to='/'>
                                    <p>Partnership</p>
                                </Link>
                            </li>
                            <li>
                                <Link to='/'>
                                    <p>Privacy policy</p>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </aside>
        </div>
    );
};

export default HamburgerMenu;