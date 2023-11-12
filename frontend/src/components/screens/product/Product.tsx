import React, {useEffect} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useGetProductQuery} from "../../../store/api/api";
import {ProductHrefState} from "../../../types/product.interface";
import ProductInfo from "./product-info/ProductInfo";
import ProductDetails from "./product-details/ProductDetails";
import Breadcrumbs from "../../shared/breadcrumbs/Breadcrumbs";
import SavedForLater from "../../shared/saved-for-later/SavedForLater";

const Product = () => {

    const {href} = useParams<keyof ProductHrefState>() as ProductHrefState

    const {data: product, isSuccess, isError} = useGetProductQuery(href)

    const navigate = useNavigate()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        if (isError) {
            navigate('/');
        }
    }, [isError, navigate]);

    return (
        <>
            <Breadcrumbs/>
            {/*{isLoading && <div>Loading...</div>}*/}
            {isSuccess && product && <React.Fragment>
                <ProductInfo item={product}/>
                <ProductDetails item={product}/>
            </React.Fragment>
            }
            {isError && <div>{isError}</div>}
            <SavedForLater/>
        </>
    );
};

export default Product;