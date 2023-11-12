import React, {useEffect} from 'react';
import classes from './Header.module.scss'
import {Link, NavLink} from "react-router-dom";
import HamburgerMenu from "../hamburger-menu/HamburgerMenu";
import {useAppDispatch} from "../../../hooks/useAppDispatch";
import {fetchGetFavorites} from "../../../store/favorites/favorites.action";
import {fetchGetCart} from "../../../store/cart/cart.action";
import TotalQuantity from "../../UI/total-quantity/TotalQuantity";
import SearchInput from "./search-input/SearchInput";

const Header = () => {

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchGetFavorites())
        dispatch(fetchGetCart())
    }, [dispatch])

    return (
        <header className={classes.header}>
            <div style={{margin: '0 auto'}} className='container'>
                <nav className={classes.nav}>
                    <div className={classes.headerContent}>
                        <div className={classes.headerTopContent}>
                            <div className={classes.burgerBtn}>
                                <HamburgerMenu/>
                            </div>
                            <Link to='/'>
                                <img src="/images/layout-icons/logo.svg" alt="logo"/>
                            </Link>
                        </div>
                        <SearchInput/>
                        <ul className={classes.list}>
                            <li>
                                <NavLink to='/profile'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                         viewBox="0 0 24 24"
                                         fill="none">
                                        <path
                                            d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM7.07 18.28C7.5 17.38 10.12 16.5 12 16.5C13.88 16.5 16.51 17.38 16.93 18.28C15.57 19.36 13.86 20 12 20C10.14 20 8.43 19.36 7.07 18.28ZM18.36 16.83C16.93 15.09 13.46 14.5 12 14.5C10.54 14.5 7.07 15.09 5.64 16.83C4.62 15.49 4 13.82 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 13.82 19.38 15.49 18.36 16.83ZM12 6C10.06 6 8.5 7.56 8.5 9.5C8.5 11.44 10.06 13 12 13C13.94 13 15.5 11.44 15.5 9.5C15.5 7.56 13.94 6 12 6ZM12 11C11.17 11 10.5 10.33 10.5 9.5C10.5 8.67 11.17 8 12 8C12.83 8 13.5 8.67 13.5 9.5C13.5 10.33 12.83 11 12 11Z"
                                            fill="#1C1C1C"/>
                                    </svg>
                                    <p>Profile</p>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to='/favorites'>
                                    <TotalQuantity type='favorites'/>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                         fill="none">
                                        <path
                                            d="M16.5 2.82501C14.76 2.82501 13.09 3.63501 12 4.91501C10.91 3.63501 9.24 2.82501 7.5 2.82501C4.42 2.82501 2 5.24501 2 8.32501C2 12.105 5.4 15.185 10.55 19.865L12 21.175L13.45 19.855C18.6 15.185 22 12.105 22 8.32501C22 5.24501 19.58 2.82501 16.5 2.82501ZM12.1 18.375L12 18.475L11.9 18.375C7.14 14.065 4 11.215 4 8.32501C4 6.32501 5.5 4.82501 7.5 4.82501C9.04 4.82501 10.54 5.81501 11.07 7.18501H12.94C13.46 5.81501 14.96 4.82501 16.5 4.82501C18.5 4.82501 20 6.32501 20 8.32501C20 11.215 16.86 14.065 12.1 18.375Z"
                                            fill="#1C1C1C"/>
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
                                            fill="#1C1C1C"/>
                                    </svg>
                                    <p>Cart</p>
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;