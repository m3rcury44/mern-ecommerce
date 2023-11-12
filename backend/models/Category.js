import mongoose from "mongoose";

const CategorySchema = mongoose.Schema({
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
    homeImg: String,
    brands: Array,
})

export default mongoose.model('Category', CategorySchema)