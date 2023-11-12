import mongoose from "mongoose";

const PurchasedItemsSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: {
        type: mongoose.Schema.Types.Array,
        ref: 'Product',
        required: true
    }
})

export default mongoose.model('PurchasedItems', PurchasedItemsSchema)