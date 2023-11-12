import React, {useEffect} from 'react';
import '../../../assets/styles/style.scss'
import MainCard from "./main-card/MainCard";
import MainRcmdItems from "./main-rcmd-items/MainRcmdItems";
import MainProducts from "./main-products/MainProducts";
import {useAppSelector} from "../../../hooks/useAppSelector";
import {useAppDispatch} from "../../../hooks/useAppDispatch";
import {getMainPageCategories} from "../../../store/category/category.action";
import {getMainPageProducts, getRcmdItems} from "../../../store/products/products.action";

const Home = () => {

    const {list: productsList, rcmdList, isLoading: productLoading} = useAppSelector(state => state.products)
    const {list: categoryList, isLoading} = useAppSelector(state => state.category);

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getMainPageCategories())
        dispatch(getMainPageProducts())
        dispatch(getRcmdItems())
    }, [dispatch])

    return (
        <>
            <MainCard categoryList={categoryList}/>
            <MainProducts productsList={productsList} categoryList={categoryList} isLoading={isLoading}/>
            <MainRcmdItems productsList={rcmdList} productLoading={productLoading}/>
        </>
    );
};

export default Home;