import React, {FC} from 'react';
import classes from './MainCard.module.scss'
import {Link} from "react-router-dom";
import MyButton from "../../../UI/buttons/my-button/MyButton";
import {useAppSelector} from "../../../../hooks/useAppSelector";
import {useAppDispatch} from "../../../../hooks/useAppDispatch";
import {logout, selectIsAuth} from "../../../../store/auth/auth.slice";
import {promocodes} from "../../cart/cart-list/CartList";
import {ICatalog} from "../../../../types/category.interface";
import Skeleton from "../../../UI/skeleton/Skeleton";
import SecurityButtons from "../../../UI/buttons/security-buttons/SecurityButtons";

const MainCard: FC<{ categoryList: ICatalog[] }> = ({categoryList}) => {
    const {data, isLoading} = useAppSelector(state => state.auth)

    const isAuth = useAppSelector(selectIsAuth)

    const dispatch = useAppDispatch()

    const onClickLogout = () => {
        dispatch(logout())
        localStorage.removeItem('token')
    }

    return (
        <section className={classes.mainCard}>
            <aside className={classes.sidebar}>
                {/*{isLoading && <div>Loading...</div>}*/}
                <div style={{display: 'grid'}}>
                    {categoryList.map(item => (
                        <Link key={item._id} to={`/category/${item.href}`}>
                            {item.title}
                        </Link>
                    ))}
                </div>
                <Link to='/category'>
                    More category
                </Link>
            </aside>
            <div className={classes.latestTrending}>
                <img className={isLoading ? classes.latestTrendingImg : classes.latestTrendingImgMaxHeight}
                     src="/images/home-icons/banner.jpg" alt="banner"/>
                <div className={classes.latestTrendingText}>
                    <p>Latest trending</p>
                    <h2>Electronic items</h2>
                    <Link to='category/electronics'>
                        <MyButton>Learn more</MyButton>
                    </Link>
                </div>
            </div>
            <div className={classes.info}>
                {isLoading ? <Skeleton style={{padding: '43px'}}/> : isAuth ?
                    <div className={classes.auth}>
                        <div className={classes.userInfo}>
                            <Link to='/profile'>
                                {data?.avatarUrl
                                    ? <img
                                        style={{borderRadius: '50%', border: '1px solid #6f6f6f'}}
                                        src={`${process.env.REACT_APP_API_URL}/uploads/${data?.avatarUrl}`}
                                        alt="avatar"
                                    />
                                    : <img src="/images/avatar.svg" alt="avatar"/>
                                }
                            </Link>
                            <div className={classes.userInfoText}>
                                <p>Hi, {data?.name}</p>
                                <p style={{marginTop: '5px'}}>Welcome!</p>
                            </div>
                        </div>
                        <div style={{display: 'grid'}}>
                            <button onClick={onClickLogout} className={classes.logoutButton}>
                                Logout
                            </button>
                        </div>
                    </div> : <div className={classes.auth}>
                        <div className={classes.userInfo}>
                            <Link to='/profile'>
                                <img src="/images/avatar.svg" alt="avatar"/>
                            </Link>
                            <div className={classes.userInfoText}>
                                <p>Hi, user</p>
                                <p>let’s get started</p>
                            </div>
                        </div>
                        <SecurityButtons/>
                    </div>}
                <div className={classes.discount}>
                    <p>Use "{promocodes[2].coupon}" to get 5$ discount</p>
                </div>
                <div className={classes.quote}>
                    <p>Send quotes with supplier preferences</p>
                </div>
            </div>
        </section>
    );
};

export default MainCard;