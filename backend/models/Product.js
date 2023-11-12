import mongoose from "mongoose";

const ProductSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    href: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    material: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    certificate: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    memory: String,
    reviews: {
        type: Array,
        default: undefined,
        required: false
    }
})

export default mongoose.model('Product', ProductSchema)