import React, {useEffect} from 'react';
import classes from './Catalog.module.scss'
import {Link} from "react-router-dom";
import {useAppSelector} from "../../../hooks/useAppSelector";
import {useAppDispatch} from "../../../hooks/useAppDispatch";
import {getCategory} from "../../../store/category/category.action";
import {optimizedImg} from '../../../utils/optimizedImg';

const Catalog = () => {

    const dispatch = useAppDispatch()

    const {list} = useAppSelector(state => state.category)

    useEffect(() => {
        dispatch(getCategory());
    }, [dispatch]);

    return (
        <section className={classes.catalog}>
            <h1>Catalog</h1>
            <div className={classes.categoriesList}>
                {list.map((item) => (
                    <Link key={item._id} className={classes.categoriesItem} to={item.href}>
                        <img src={optimizedImg(item.img)} alt={item.title}/>
                        <h5>{item.title}</h5>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default Catalog;