import React, {useEffect} from 'react';
import classes from "./SavedForLater.module.scss";
import {useAppSelector} from "../../../hooks/useAppSelector";
import {useAppDispatch} from "../../../hooks/useAppDispatch";
import {fetchGetFullFavorites} from "../../../store/favorites/favorites.action";
import SavedForLaterItem from "./saved-for-later-item/SavedForLaterItem";

const SavedForLater = () => {

    const {data, status} = useAppSelector(state => state.favorites)

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchGetFullFavorites())
    }, [dispatch])

    if (!data.length) {
        return <></>
    }

    return (
        <section className={classes.savedForLater}>
            <h4 className={classes.title}>Saved for later</h4>
            <div className={classes.savedForLaterList}>
                {data.map(item => (
                    <SavedForLaterItem key={item.productId} item={item} status={status}/>
                ))}
            </div>
        </section>
    );
};

export default SavedForLater;