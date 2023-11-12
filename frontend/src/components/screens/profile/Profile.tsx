import React, {ChangeEvent, useEffect, useRef, useState} from 'react';
import classes from './Profile.module.scss'
import {useAppSelector} from "../../../hooks/useAppSelector";
import {logout, selectIsAuth} from "../../../store/auth/auth.slice";
import {useAppDispatch} from "../../../hooks/useAppDispatch";
import {toast} from "react-toastify";
import {fetchUploadImage} from "../../../store/auth/auth.action";
import Popup, {IPopup} from "../../shared/popup/Popup";
import {fetchGetPurchaseItems} from "../../../store/purchase/purchase.action";
import PurchasedItem from "./purchased-item/PurchasedItem";
import NotAuth from "../../shared/not-auth/NotAuth";

const Profile = () => {

    const imageRef = useRef<HTMLInputElement>(null)

    const dispatch = useAppDispatch()
    const isAuth = useAppSelector(selectIsAuth)
    const {data, isLoading} = useAppSelector(state => state.auth)
    const {items, status} = useAppSelector(state => state.purchase)
    const [visible, setVisible] = useState(8)

    const loadMore = () => {
        if (items.length < visible) {
            return
        } else {
            setVisible(prevState => prevState + 8)
        }
    }

    useEffect(() => {
        dispatch(fetchGetPurchaseItems(visible))
    }, [dispatch, visible])

    const onClickLogout = () => {
        dispatch(logout())
        localStorage.removeItem('token')
    }

    const onChangeImage = async (e: ChangeEvent<HTMLInputElement>) => {
        const formData = new FormData()
        const file = e.target.files?.[0]

        if (!file) {
            return
        }

        const allowedExtensions = ['jpg', 'png', 'jpeg']
        const isAllowed = allowedExtensions.some(obj => file.type.includes(obj))

        if (!isAllowed) {
            return toast.error('Files can only be in png, jpg or jpeg formats')
        }

        if (file.size > 5242880) {
            return toast.error('The size of your file should not exceed 5 MB')
        }

        if (file.name.length > 200) {
            return toast.error('The characters in the name of your file should be no more than 200')
        }

        if (file) {
            formData.append('image', file)
            const data = await dispatch(fetchUploadImage(formData))

            if (!data.payload) {
                toast.error('Failed to upload image')
            } else {
                toast.success('Image is uploaded')
            }
        }
    }

    const popupData: IPopup = {
        firstBtn: {
            onClick: () => imageRef.current?.click(),
            text: 'Update avatar'
        },
        secondBtn: {
            onClick: onClickLogout,
            text: 'Logout'
        }
    }

    if (!isAuth && !isLoading) {
        return <NotAuth/>
    }

    if (!items) {
        return <div></div>
    }

    return (
        <div className={classes.profile}>
            <section className={classes.profileInfo}>
                <div style={{display: 'flex'}}>
                    {data?.avatarUrl
                        ? <img src={`${process.env.REACT_APP_API_URL}/uploads/${data?.avatarUrl}`} alt="avatar"/>
                        : <img src="/images/avatar.svg" alt="avatar"/>
                    }
                    <h2>{data?.name}</h2>
                </div>
                <div className={classes.popupMenu}>
                    <Popup popupData={popupData}/>
                </div>
                <input ref={imageRef} onChange={onChangeImage} hidden type="file"/>
            </section>
            <section>
                <h3>Purchased Items</h3>
                {!items.length && status !== 'loading' ?
                    <div className={classes.nothingPurchased}>You didn't buy anything :(</div> :
                    <div className={classes.purchasedItems}>
                        {items.slice(0, visible).map(item => (
                            <PurchasedItem key={item.productId} item={item} status={status}/>
                        ))}
                    </div>}
            </section>
            {items.length < visible || !items.length ? '' :
                <button className={classes.loadMoreBtn} onClick={loadMore}>Load more</button>}
        </div>
    );
};

export default Profile;