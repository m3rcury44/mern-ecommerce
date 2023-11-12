import React, {FC} from 'react';
import classes from './TotalQuantity.module.scss';
import {useAppSelector} from "../../../hooks/useAppSelector";

const TotalQuantity: FC<{ type: string }> = ({type}) => {

    const {totalQuantity} = useAppSelector(state => state.cart)

    const favoritesQuantity = useAppSelector(state => state.favorites.data.length)

    return (
        <span className={classes.totalQuantity}>
            {type === 'favorites' ? favoritesQuantity ? favoritesQuantity : '' : ''}
            {type === 'cart' ? totalQuantity ? totalQuantity : '' : ''}
        </span>
    );
};

export default TotalQuantity;