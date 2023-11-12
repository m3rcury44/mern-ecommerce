import React, {FC} from 'react';
import classes from './SearchItem.module.scss'
import {Link} from "react-router-dom";
import AddToCartBtn from "../../../UI/buttons/add-to-cart-btn/AddToCartBtn";
import {IProduct} from "../../../../types/product.interface";
import {optimizedImg} from "../../../../utils/optimizedImg";

const SearchItem: FC<{ item: IProduct }> = ({item}) => {
    return (
        <div className={classes.searchItem}>
            <Link to={`/category/${item.category}/${item.href}`}>
                <img src={optimizedImg(item.img)} alt={item.title}/>
            </Link>
            <div className={classes.searchItemInfo}>
                <h5>${item.price}</h5>
                <p>{item.model}</p>
                <p>{item.title} - {item.color}</p>
            </div>
            <AddToCartBtn id={item._id}/>
        </div>
    );
};

export default SearchItem;