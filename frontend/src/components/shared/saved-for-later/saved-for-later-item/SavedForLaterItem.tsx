import React, {FC} from 'react';
import classes from "./SavedForLaterItem.module.scss";
import {Link} from "react-router-dom";
import MyButton from "../../../UI/buttons/my-button/MyButton";
import {fetchAddToCart, fetchGetFullCart} from "../../../../store/cart/cart.action";
import {fetchRemoveFromFavorites} from "../../../../store/favorites/favorites.action";
import {useAppDispatch} from "../../../../hooks/useAppDispatch";
import {IFavorites} from "../../../../types/favorites.interface";
import Skeleton from "../../../UI/skeleton/Skeleton";
import {optimizedImg} from "../../../../utils/optimizedImg";
import ClearIcon from "../../../UI/svg-icons/clear-icon/ClearIcon";

const SavedForLaterItem: FC<{ item: IFavorites, status: string }> = ({item, status}) => {

    const dispatch = useAppDispatch()

    const moveToCart = async () => {
        await dispatch(fetchAddToCart({productId: item.productId}))
        dispatch(fetchGetFullCart())
        dispatch(fetchRemoveFromFavorites(item.productId))
    }

    const removeFromFavorites = () => {
        dispatch(fetchRemoveFromFavorites(item.productId))
    }

    if (status === 'loading') {
        return <div className={classes.adaptiveSkeleton}>
            <Skeleton/>
        </div>
    }

    return (
        <div className={classes.savedForLaterItem}>
            <Link to={`/category/${item.category}/${item.href}`}>
                <div className={classes.savedForLaterItemImg}>
                    <img src={optimizedImg(item.img)} alt={item.title}/>
                </div>
            </Link>
            <h5>${item.price}</h5>
            <div style={{marginBottom: '12px'}}>
                <p>{item.model}</p>
                <p>{(item.title?.length + item.color?.length) > 14 ? item.title : `${item.title} - ${item.color}`}</p>
                {/*<p>{item.title} - {item.color}</p>*/}
            </div>
            <div className={classes.savedForLaterItemBtns}>
                <MyButton onClick={moveToCart}>
                    <p>Move to cart</p>
                </MyButton>
                <MyButton onClick={removeFromFavorites}>Remove</MyButton>
                <MyButton onClick={removeFromFavorites}>
                    <ClearIcon/>
                </MyButton>
            </div>
        </div>
    );
};

export default SavedForLaterItem;