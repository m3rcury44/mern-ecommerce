import React, {FC} from 'react';
import classes from './Reviews.module.scss'
import {IReview} from "../../../../../types/product.interface";
import {IUser} from "../../../../../types/user.interface";
import {useAppDispatch} from "../../../../../hooks/useAppDispatch";
import {fetchDeleteReview} from "../../../../../store/reviews/reviews.action";
import Skeleton from "../../../../UI/skeleton/Skeleton";
import ClearIcon from "../../../../UI/svg-icons/clear-icon/ClearIcon";

const Reviews: FC<{ item: IReview, data: IUser | null, status: string }> = ({item, data, status}) => {

    const dispatch = useAppDispatch()

    if (status === 'loading') {
        return <Skeleton style={{height: '51px'}}/>
    }

    const handleRemoveItem = () => {
        dispatch(fetchDeleteReview(item._id))
    }

    return (
        <div className={classes.review}>
            <div style={{display: 'flex', gap: '10px'}}>
                {item.user.avatarUrl
                    ? <img src={`${process.env.REACT_APP_API_URL}/uploads/${item.user.avatarUrl}`}
                           alt="avatar"/>
                    : <img src="/images/avatar.svg" alt="avatar"/>
                }
                <div>
                    <h6>{item.user.name}</h6>
                    <p>{item.text}</p>
                </div>
            </div>
            {data?._id === item.user._id ?
                <ClearIcon onClick={handleRemoveItem} className={classes.removeBtn}/>
                : ''}
        </div>
    );
};

export default Reviews;