import React, {FC} from 'react';
import classes from './MainProducts.module.scss';
import {Link} from 'react-router-dom';
import MyButton from '../../../UI/buttons/my-button/MyButton';
import {IProduct} from "../../../../types/product.interface";
import {ICatalog} from "../../../../types/category.interface";
import {optimizedImg} from "../../../../utils/optimizedImg";
import Skeleton from "../../../UI/skeleton/Skeleton";

const MainProducts: FC<{
    productsList: IProduct[],
    categoryList: ICatalog[],
    isLoading: boolean,
}> = ({
          productsList,
          categoryList,
          isLoading,
      }) => {

    const sortedCategories = categoryList.slice(0, 2)

    const arr = new Array(2).fill(undefined)

    return (
        <>
            {isLoading ? arr.map((_, i) => <div key={i} className={classes.adaptiveSkeleton}><Skeleton/>
            </div>) : sortedCategories.map(item => (
                <section key={item._id} className={classes.products}>
                    <div className={classes.categoryInfo}>
                        <img src={item.homeImg} alt={item.title}/>
                        <div className={classes.categoryInfoText}>
                            <h4>{item.title}</h4>
                            <Link to={`/category/${item.href}`}>
                                <MyButton>Source now</MyButton>
                            </Link>
                        </div>
                    </div>
                    <div className={classes.productsList}>
                        {productsList.filter(product => product.category === item.href)
                            .slice(0, 8)
                            .map(product => (
                                <Link key={product._id} className={classes.productItem}
                                      to={`/category/${item.href}/${product.href}`}>
                                    <p>{product.title}</p>
                                    <img src={optimizedImg(product.img)} alt={product.title}/>
                                </Link>
                            ))}
                    </div>
                    <div className={classes.categoryBtn}>
                        <Link to={`/category/${item.href}`}>
                            <MyButton>Source now &rarr;</MyButton>
                        </Link>
                    </div>
                </section>
            ))}
        </>
    );
};

export default MainProducts;
