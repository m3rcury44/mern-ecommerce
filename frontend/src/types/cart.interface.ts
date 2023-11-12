import {IProduct} from "./product.interface";

export interface ICart extends Pick<IProduct, '_id' | 'quantity' | 'price' | 'color' | 'material' | 'size' | 'title' | 'href' | 'img' | 'category'> {
    productId: string
}