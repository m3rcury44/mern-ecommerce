import React, {ChangeEvent, FC, useEffect, useState} from 'react';
import classes from "./ProductDetails.module.scss";
import {IItem} from "../../../../types/product.interface";
import {useAppSelector} from "../../../../hooks/useAppSelector";
import MyButton from "../../../UI/buttons/my-button/MyButton";
import {Link} from "react-router-dom";
import {useAppDispatch} from "../../../../hooks/useAppDispatch";
import {fetchGetReviews, fetchSendReview} from "../../../../store/reviews/reviews.action";
import Reviews from "./reviews/Reviews";
import {toast} from "react-toastify";
import {selectIsAuth} from "../../../../store/auth/auth.slice";

const ProductDetails: FC<IItem> = ({item}) => {

    const dispatch = useAppDispatch()

    const [isActive, setIsActive] = useState(false)
    const [comment, setComment] = useState('')

    const isAuth = useAppSelector(selectIsAuth)
    const {data} = useAppSelector(state => state.auth)
    const {items, status} = useAppSelector(state => state.reviews)

    useEffect(() => {
        dispatch(fetchGetReviews(item._id))
    }, [dispatch, item._id])

    const sendReview = async () => {
        if (!comment) {
            return toast.error(`You can't send review without text`)
        }

        await dispatch(fetchSendReview({productId: item._id, text: comment}))
        dispatch(fetchGetReviews(item._id))
        setComment('')
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setComment(e.target.value)
    }

    return (
        <section className={classes.productDetails}>
            <div className={classes.productDetailsTitle}>
                <p onClick={() => setIsActive(false)} className={!isActive ? classes.activeBtn : ''}>Description</p>
                <p onClick={() => setIsActive(true)} className={isActive ? classes.activeBtn : ''}>Reviews</p>
            </div>
            {!isActive ?
                <>
                    <p className={classes.productDescInfo}>{item.description}</p>
                    <table className={classes.productDescTable}>
                        <tbody>
                        <tr>
                            <th>Model</th>
                            <td>{item.model}</td>
                        </tr>
                        <tr>
                            <th>Type</th>
                            <td>{item.type}</td>
                        </tr>
                        <tr>
                            <th>Certificate</th>
                            <td>{item.certificate}</td>
                        </tr>
                        <tr>
                            <th>Size</th>
                            <td>{item.size}</td>
                        </tr>
                        {!item.memory ? '' : <tr>
                            <th>Memory</th>
                            <td>{item.memory}</td>
                        </tr>}
                        </tbody>
                    </table>
                    <div className={classes.productDescFacts}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path
                                d="M7.32923 13.2291L3.85423 9.75414L2.6709 10.9291L7.32923 15.5875L17.3292 5.58748L16.1542 4.41248L7.32923 13.2291Z"
                                fill="#8B96A5"/>
                        </svg>
                        <p>Some great feature name here</p>
                    </div>
                    <div className={classes.productDescFacts}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path
                                d="M7.32923 13.2291L3.85423 9.75414L2.6709 10.9291L7.32923 15.5875L17.3292 5.58748L16.1542 4.41248L7.32923 13.2291Z"
                                fill="#8B96A5"/>
                        </svg>
                        <p>Lorem ipsum dolor sit amet, consectetur </p>
                    </div>
                    <div className={classes.productDescFacts}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path
                                d="M7.32923 13.2291L3.85423 9.75414L2.6709 10.9291L7.32923 15.5875L17.3292 5.58748L16.1542 4.41248L7.32923 13.2291Z"
                                fill="#8B96A5"/>
                        </svg>
                        <p>Duis aute irure dolor in reprehenderit</p>
                    </div>
                    <div className={classes.productDescFacts}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path
                                d="M7.32923 13.2291L3.85423 9.75414L2.6709 10.9291L7.32923 15.5875L17.3292 5.58748L16.1542 4.41248L7.32923 13.2291Z"
                                fill="#8B96A5"/>
                        </svg>
                        <p>Some great feature name here</p>
                    </div>
                </> :
                <div className={classes.reviews}>
                    {!items?.reviews.length ?
                        <div className={classes.noReviews}>There are no reviews here yet
                            :(</div> : items?.reviews.map(review => (
                            <Reviews key={review._id} item={review} data={data} status={status}/>
                        ))}
                    {isAuth ? <div className={classes.sendReview}>
                        <Link to='/profile'>
                            {data?.avatarUrl
                                ?
                                <img src={`${process.env.REACT_APP_API_URL}/uploads/${data?.avatarUrl}`} alt="avatar"/>
                                : <img src="/images/avatar.svg" alt="avatar"/>
                            }
                        </Link>
                        <div className={classes.sendReviewForm}>
                            <input value={comment} onChange={handleChange} placeholder='Type your review' type="text"/>
                            <MyButton onClick={sendReview}>Send your review</MyButton>
                        </div>
                    </div> : ''}
                </div>
            }
        </section>
    );
};

export default ProductDetails;