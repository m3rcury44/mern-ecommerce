import React, {useEffect, useState} from 'react';
import classes from './Category.module.scss'
import {useNavigate, useParams} from "react-router-dom";
import MyButton from "../../UI/buttons/my-button/MyButton";
import CategoryGridItem from "./category-grid-item/CategoryGridItem";
import CategoryListItem from "./category-list-item/CategoryListItem";
import {ProductHrefState} from "../../../types/product.interface";
import {useAppSelector} from "../../../hooks/useAppSelector";
import {useAppDispatch} from "../../../hooks/useAppDispatch";
import Breadcrumbs from "../../shared/breadcrumbs/Breadcrumbs";
import Filters from "./filters/Filters";
import {setCurrentPage} from "../../../store/filter/filter.slice"
import {useFilterProductsQuery} from "../../../store/api/api";
import Pagination from "../../shared/pagination/Pagination";
import qs from 'qs';
import {getCategoryPage} from "../../../store/category/category.action";

const Category = () => {

    const [view, setView] = useState(false)
    const {href} = useParams<keyof ProductHrefState>() as ProductHrefState
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const navigate = useNavigate()

    const dispatch = useAppDispatch()

    const {list: categoryList} = useAppSelector(state => state.category);

    const {
        currentPage,
        sortByPrice,
        sortByBrand,
        searchByMinPrice,
        searchByMaxPrice
    } = useAppSelector(state => state.filter)

    const {data, isLoading, isError} = useFilterProductsQuery({
        currentCategory: href,
        currentPage,
        sortByPrice,
        sortByBrand,
        searchByMinPrice,
        searchByMaxPrice
    })

    useEffect(() => {
        dispatch(getCategoryPage())

        window.scrollTo(0, 0)
    }, [dispatch, href]);

    useEffect(() => {
        const queryString = qs.stringify({
            currentPage,
            sortByPrice,
            sortByBrand: selectedBrands.join(','),
            searchByMinPrice,
            searchByMaxPrice
        })

        if (!queryString) {
            navigate('/')
        }

        navigate(`?${queryString}`);

    }, [currentPage, sortByPrice, selectedBrands, searchByMinPrice, searchByMaxPrice, navigate])

    const onChangePage = (currentPage: number) => {
        dispatch(setCurrentPage(currentPage))

        window.scrollTo(0, 0)
    }

    const filtersProps = {
        href,
        category: data?.category,
        categoryList,
        selectedBrands,
        setSelectedBrands
    };

    useEffect(() => {
        if (isError) {
            navigate('/')
        }
    }, [isError, navigate])

    return (
        <>
            <Breadcrumbs/>
            <section className={classes.content}>
                <Filters Filters={filtersProps}/>
                <div style={{width: '100%'}}>
                    <div className={classes.itemsHeader}>
                        <p>{data?.categoryLength} items in <b>{data?.category?.title}</b></p>
                        <div className={classes.itemsHeaderBtns}>
                            <MyButton onClick={() => setView(true)}
                                      style={{borderRight: '1px solid #DEE2E7', background: view ? '#EFF2F4' : ''}}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                     fill="none">
                                    <path d="M11 3H3V11H11V3Z" fill="#1C1C1C"/>
                                    <path d="M11 13H3V21H11V13Z" fill="#1C1C1C"/>
                                    <path d="M21 3H13V11H21V3Z" fill="#1C1C1C"/>
                                    <path d="M21 13H13V21H21V13Z" fill="#1C1C1C"/>
                                </svg>
                            </MyButton>
                            <MyButton onClick={() => setView(false)} style={{background: view ? '' : '#EFF2F4'}}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                     fill="none">
                                    <path d="M21 8H3V4H21V8ZM21 10H3V14H21V10ZM21 16H3V20H21V16Z" fill="#1C1C1C"/>
                                </svg>
                            </MyButton>
                        </div>
                    </div>
                    {!data?.filteredLength && !isLoading && <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '40px',
                        height: '70%'
                    }}>Nothing was found</div>}
                    {view ? (
                        <div className={classes.gridList}>
                            {data?.products?.map((item, i) => (
                                <CategoryGridItem key={i} item={item}/>
                            ))}
                        </div>
                    ) : (
                        <div style={{display: 'grid', gap: '10px'}}>
                            {data?.products?.map((item, i) => (
                                <CategoryListItem key={i} item={item}/>
                            ))}
                        </div>
                    )}
                    {!data?.products?.length ? '' : <Pagination
                        onChangePage={onChangePage}
                        currentPage={currentPage}
                        length={data?.filteredLength}
                    />}
                </div>
            </section>
        </>
    );
};

export default Category;