import {IProduct} from "./product.interface";

export interface IFavorites extends Pick<IProduct, '_id' | 'title' | 'img' | 'href' | 'price' | 'category' | 'color' | 'model'> {
    productId: string
}