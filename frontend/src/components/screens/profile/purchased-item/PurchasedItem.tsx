import React, {FC} from 'react';
import classes from "./PurchasedItem.module.scss";
import {Link} from "react-router-dom";
import {IPurchaseItem} from "../../../../types/purchase.interface";
import Skeleton from "../../../UI/skeleton/Skeleton";
import {optimizedImg} from "../../../../utils/optimizedImg";

const PurchasedItem: FC<{ item: IPurchaseItem, status: string }> = ({item, status}) => {

    const totalPrice = item.price * item.quantity

    if (status === 'loading') {
        return <div className={classes.adaptiveSkeleton}><Skeleton/></div>
    }

    return (
        <Link to={`/category/${item.category}/${item.href}`}>
            <div className={classes.purchasedItem}>
                <div className={classes.purchasedItemImg}>
                    <img loading='lazy' src={optimizedImg(item.img)} alt={item.title}/>
                </div>
                <div className={classes.purchasedItemInfo}>
                    <h4>{item.title} ({item.quantity})</h4>
                    <h5>${totalPrice.toFixed(2)}</h5>
                </div>
            </div>
        </Link>
    );
};

export default PurchasedItem;