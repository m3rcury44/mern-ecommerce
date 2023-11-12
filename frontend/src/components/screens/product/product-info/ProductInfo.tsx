import React, {FC} from 'react';
import classes from "./ProductInfo.module.scss";
import {useAppDispatch} from "../../../../hooks/useAppDispatch";
import {fetchAddToCart} from "../../../../store/cart/cart.action";
import {toast} from "react-toastify";
import {fetchAddToFavorites, fetchGetFullFavorites} from "../../../../store/favorites/favorites.action";
import {useAppSelector} from "../../../../hooks/useAppSelector";
import {IItem} from "../../../../types/product.interface";
import {isInFavorites} from "../../../../store/favorites/favorites.slice";

const ProductInfo: FC<IItem> = ({item}) => {

    const dispatch = useAppDispatch()

    const productId = useAppSelector(state => isInFavorites({state, id: item._id}))

    const {items} = useAppSelector(state => state.reviews)

    const addToCart = () => {
        dispatch(fetchAddToCart({productId: item._id}))
    }

    const addToFavorites = async () => {
        const data = await dispatch(fetchAddToFavorites({productId: item._id}))
        dispatch(fetchGetFullFavorites())

        if (!data.payload) {
            toast.error(`Couldn't add item to favorites`)
        }
    }

    return (
        <section className={classes.product}>
            <div className={classes.productImg}>
                <img src={item.img} alt={item.title}/>
            </div>
            <div className={classes.productInfo}>
                <h4>{item.title}</h4>
                <div className={classes.productPrice}>
                    <h5>{`$${item.price}`}</h5>
                    <div style={{display: 'flex', gap: '6px', paddingLeft: '10px'}}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path
                                d="M3.33317 3.33329H16.6665V13.3333H4.30817L3.33317 14.3083V3.33329ZM3.33317 1.66663C2.4165 1.66663 1.67484 2.41663 1.67484 3.33329L1.6665 18.3333L4.99984 15H16.6665C17.5832 15 18.3332 14.25 18.3332 13.3333V3.33329C18.3332 2.41663 17.5832 1.66663 16.6665 1.66663H3.33317ZM4.99984 9.99996H14.9998V11.6666H4.99984V9.99996ZM4.99984 7.49996H14.9998V9.16663H4.99984V7.49996ZM4.99984 4.99996H14.9998V6.66663H4.99984V4.99996Z"
                                fill="#8B96A5"/>
                        </svg>
                        <p>{!items?.reviews ? 0 : items?.reviews.length} reviews</p>
                    </div>
                </div>
                <div>
                    <div className={classes.productInfoItem}>
                        <div>
                            <p>Price:</p>
                            <span>{`$${item.price}`}</span>
                        </div>
                    </div>
                    <div className={classes.productInfoItem}>
                        <div>
                            <p>Type:</p>
                            <span>{item.type}</span>
                        </div>
                        <div>
                            <p>Brand:</p>
                            <span>{item.brand}</span>
                        </div>
                        <div>
                            <p>Material:</p>
                            <span>{item.material}</span>
                        </div>
                        <div>
                            <p>Size:</p>
                            <span>{item.size}</span>
                        </div>
                        <div>
                            <p>Color:</p>
                            <span>{item.color}</span>
                        </div>
                    </div>
                    <div className={classes.productInfoItem}>
                        <div>
                            <p>Protection:</p>
                            <span>Refund Policy</span>
                        </div>
                        <div>
                            <p>Warranty:</p>
                            <span>2 years full warranty</span>
                        </div>
                    </div>
                </div>
                <div style={{display: 'flex', gap: '30px'}}>
                    <button onClick={addToCart} className={classes.productAddBtn}>
                        Add to cart
                    </button>
                    <button onClick={addToFavorites} className={classes.productFavorite}>
                        {productId
                            ? <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
                                <path fill="#0D6EFD" fillRule="evenodd"
                                      d="M12 22c-.316-.02-.56-.147-.848-.278a23.542 23.542 0 0 1-4.781-2.942C3.777 16.705 1 13.449 1 9a6 6 0 0 1 6-6 6.183 6.183 0 0 1 5 2.568A6.183 6.183 0 0 1 17 3a6 6 0 0 1 6 6c0 4.448-2.78 7.705-5.375 9.78a23.599 23.599 0 0 1-4.78 2.942c-.543.249-.732.278-.845.278ZM7 5a4 4 0 0 0-4 4c0 3.552 2.218 6.296 4.621 8.22A21.525 21.525 0 0 0 12 19.91a21.58 21.58 0 0 0 4.377-2.69C18.78 15.294 21 12.551 21 9a4 4 0 0 0-4-4c-1.957 0-3.652 1.396-4.02 3.2a1 1 0 0 1-1.96 0C10.652 6.396 8.957 5 7 5Z"
                                      clipRule="evenodd">
                                </path>
                                <path fill="white" fillRule="evenodd"
                                      d="M12 22c-.285-.018-.512-.123-.764-.24a21.77 21.77 0 0 1-1.273-.628 23.542 23.542 0 0 1-3.592-2.351C3.777 16.704 1 13.448 1 9a6 6 0 0 1 6-6 6.18 6.18 0 0 1 5 2.568A6.18 6.18 0 0 1 17 3a6 6 0 0 1 6 6c0 4.448-2.78 7.705-5.375 9.78a23.599 23.599 0 0 1-4.78 2.942c-.543.249-.732.278-.845.278Zm0-17.959A7.178 7.178 0 0 1 17 2a7 7 0 0 1 7 7c0 4.897-3.061 8.41-5.75 10.562a24.585 24.585 0 0 1-4.989 3.07c-.566.258-.92.368-1.261.368h-.032l-.033-.002c-.484-.032-.881-.218-1.12-.33a22.658 22.658 0 0 1-1.322-.653 24.524 24.524 0 0 1-3.747-2.454C3.058 17.41 0 13.896 0 9a7 7 0 0 1 7-7c1.918 0 3.701.776 5 2.041ZM3 9a4 4 0 0 1 4-4c1.957 0 3.652 1.396 4.02 3.2a1 1 0 0 0 1.96 0C13.348 6.396 15.043 5 17 5a4 4 0 0 1 4 4c0 3.552-2.22 6.295-4.625 8.22A21.58 21.58 0 0 1 12 19.91a21.525 21.525 0 0 1-4.377-2.69C5.217 15.295 3 12.551 3 9Z"
                                      clipRule="evenodd">
                                </path>
                            </svg>
                            : <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
                                <path fill="#1C1C1C" fillRule="evenodd"
                                      d="M12 22c-.316-.02-.56-.147-.848-.278a23.542 23.542 0 0 1-4.781-2.942C3.777 16.705 1 13.449 1 9a6 6 0 0 1 6-6 6.183 6.183 0 0 1 5 2.568A6.183 6.183 0 0 1 17 3a6 6 0 0 1 6 6c0 4.448-2.78 7.705-5.375 9.78a23.599 23.599 0 0 1-4.78 2.942c-.543.249-.732.278-.845.278ZM7 5a4 4 0 0 0-4 4c0 3.552 2.218 6.296 4.621 8.22A21.525 21.525 0 0 0 12 19.91a21.58 21.58 0 0 0 4.377-2.69C18.78 15.294 21 12.551 21 9a4 4 0 0 0-4-4c-1.957 0-3.652 1.396-4.02 3.2a1 1 0 0 1-1.96 0C10.652 6.396 8.957 5 7 5Z"
                                      clipRule="evenodd">
                                </path>
                                <path fill="white" fillRule="evenodd"
                                      d="M12 22c-.285-.018-.512-.123-.764-.24a21.77 21.77 0 0 1-1.273-.628 23.542 23.542 0 0 1-3.592-2.351C3.777 16.704 1 13.448 1 9a6 6 0 0 1 6-6 6.18 6.18 0 0 1 5 2.568A6.18 6.18 0 0 1 17 3a6 6 0 0 1 6 6c0 4.448-2.78 7.705-5.375 9.78a23.599 23.599 0 0 1-4.78 2.942c-.543.249-.732.278-.845.278Zm0-17.959A7.178 7.178 0 0 1 17 2a7 7 0 0 1 7 7c0 4.897-3.061 8.41-5.75 10.562a24.585 24.585 0 0 1-4.989 3.07c-.566.258-.92.368-1.261.368h-.032l-.033-.002c-.484-.032-.881-.218-1.12-.33a22.658 22.658 0 0 1-1.322-.653 24.524 24.524 0 0 1-3.747-2.454C3.058 17.41 0 13.896 0 9a7 7 0 0 1 7-7c1.918 0 3.701.776 5 2.041ZM3 9a4 4 0 0 1 4-4c1.957 0 3.652 1.396 4.02 3.2a1 1 0 0 0 1.96 0C13.348 6.396 15.043 5 17 5a4 4 0 0 1 4 4c0 3.552-2.22 6.295-4.625 8.22A21.58 21.58 0 0 1 12 19.91a21.525 21.525 0 0 1-4.377-2.69C5.217 15.295 3 12.551 3 9Z"
                                      clipRule="evenodd">
                                </path>
                            </svg>
                        }
                        <p>Save for later</p>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default ProductInfo;