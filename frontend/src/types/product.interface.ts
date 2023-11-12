import {IUser} from "./user.interface";

export interface IProduct {
    _id: string
    title: string
    img: string
    href: string
    price: number
    category: string
    type: string
    material: string
    size: string
    color: string
    model: string
    certificate: string
    description: string
    memory: string
    brand: string
    quantity: number
}

export interface IReviews {
    _id: string
    productId: string
    reviews: IReview[]
}

export interface IReview {
    _id: string
    user: IUser
    text: string
}

export interface ProductHrefState extends Pick<IProduct, 'href'> {
}

export interface IItem {
    item: IProduct
}