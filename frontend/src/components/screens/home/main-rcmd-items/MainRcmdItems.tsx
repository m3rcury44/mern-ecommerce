import React, {FC} from 'react';
import {Link} from 'react-router-dom';
import classes from './MainRcmdItems.module.scss'
import {IProduct} from "../../../../types/product.interface";
import {optimizedImg} from "../../../../utils/optimizedImg";
import Skeleton from "../../../UI/skeleton/Skeleton";

const MainRcmdItems: FC<{ productsList: IProduct[], productLoading: boolean }> = ({productsList, productLoading}) => {

    const arr = new Array(10).fill(undefined)

    return (
        <section className={classes.section}>
            <h3>Recommended items</h3>
            <div className={classes.rcmdList}>
                {productLoading ? arr.map((_, i) => (
                    <div key={i} className={classes.adaptiveSkeleton}><Skeleton/></div>
                )) : productsList.map(item => (
                    <Link key={item._id} className={classes.rcmdItem}
                          to={`/category/${item.category}/${item.href}`}>
                        <img src={optimizedImg(item.img)} alt={item.title}/>
                        <p>{`$${item.price}`}</p>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default MainRcmdItems;