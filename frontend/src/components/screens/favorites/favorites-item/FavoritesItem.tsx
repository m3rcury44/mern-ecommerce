import React, {FC} from 'react';
import classes from "./FavoritesItem.module.scss";
import {Link} from "react-router-dom";
import MyButton from "../../../UI/buttons/my-button/MyButton";
import AddToCartBtn from "../../../UI/buttons/add-to-cart-btn/AddToCartBtn";
import {useAppDispatch} from "../../../../hooks/useAppDispatch";
import {fetchRemoveFromFavorites} from "../../../../store/favorites/favorites.action";
import {IFavorites} from "../../../../types/favorites.interface";
import Skeleton from "../../../UI/skeleton/Skeleton";
import {optimizedImg} from "../../../../utils/optimizedImg";
import ClearIcon from "../../../UI/svg-icons/clear-icon/ClearIcon";

const FavoritesItem: FC<{ item: IFavorites, status: string }> = ({item, status}) => {

    const dispatch = useAppDispatch()

    const removeFromFavorites = () => {
        dispatch(fetchRemoveFromFavorites(item.productId))
    }

    if (status === 'loading') {
        return <div className={classes.adaptiveSkeleton}><Skeleton/></div>
    }

    return (
        <div className={classes.favoritesItem}>
            <Link to={`/category/${item.category}/${item.href}`}>
                <div className={classes.favoritesItemImg}>
                    <img src={optimizedImg(item.img)} alt={item.title}/>
                </div>
            </Link>
            <div style={{display: 'flex', justifyContent: 'space-between', padding: '20px 10px'}}>
                <div className={classes.favoritesItemInfo}>
                    <h5>${item.price}</h5>
                    <p>{item.model} </p>
                    <p>{item.title} - {item.color}</p>
                </div>
                <div className={classes.favoritesItemBtn}>
                    <MyButton onClick={removeFromFavorites}>
                        <ClearIcon/>
                    </MyButton>
                </div>
            </div>
            <AddToCartBtn id={item.productId}/>
        </div>
    );
};

export default FavoritesItem;