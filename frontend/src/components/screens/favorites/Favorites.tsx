import React, {useEffect} from 'react';
import classes from './Favorites.module.scss'
import {useAppSelector} from "../../../hooks/useAppSelector";
import {useAppDispatch} from "../../../hooks/useAppDispatch";
import {fetchGetFullFavorites} from "../../../store/favorites/favorites.action";
import FavoritesItem from "./favorites-item/FavoritesItem";
import EmptyComponent from "../../shared/empty-component/EmptyComponent";
import {selectIsAuth} from "../../../store/auth/auth.slice";
import NotAuth from "../../shared/not-auth/NotAuth";

const Favorites = () => {

    const {data, status} = useAppSelector(state => state.favorites)
    const isAuth = useAppSelector(selectIsAuth)

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchGetFullFavorites())
    }, [dispatch])

    if (!isAuth && status === 'error') {
        return <NotAuth/>
    }

    return (
        <section className={classes.favorites}>
            <h1>Favorites</h1>
            {/*{!items.length ? <FavoritesEmpty/> :*/}
            {/*    <div className={classes.favoritesList}>*/}
            {/*        {items.map(item => (*/}
            {/*            <FavoritesItem key={item._id} item={item}/>*/}
            {/*        ))}*/}
            {/*    </div>*/}
            {/*}*/}
            {!data?.length && status !== 'loading' ? <EmptyComponent text='favorites' style={{height: '80%'}}/> :
                <div className={classes.favoritesList}>
                    {data.map(item => (
                        <FavoritesItem key={item.productId} item={item} status={status}/>
                    ))}
                </div>}
        </section>
    );
};

export default Favorites;