import express from 'express';
import multer from 'multer';
import fs from 'fs'
import cors from 'cors'
import mongoose from 'mongoose';
import {
    CartController,
    CategoryController,
    FavoritesController,
    ProductController,
    PurchaseController,
    ReviewsController,
    UserController
} from './controllers/index.js'
import {loginValidation, registerValidation} from './validations/Auth.js'
import {checkAuth, handleValidationErrors} from './utils/index.js'

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log('DB is OK'))
    .catch((err) => console.log('DB error:', err))

const app = express()

app.use(express.json())
app.use(cors())
app.use('/uploads', express.static('uploads'))

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        if (!fs.existsSync('uploads')) {
            fs.mkdirSync('uploads')
        }
        cb(null, 'uploads')
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname)
    },
})

const upload = multer({
    storage,
    limits: {
        fieldNameSize: 200,
        fileSize: 5242880,
    },
    fileFilter: (req, file, cb) => {
        if (
            file.mimetype == 'image/png' ||
            file.mimetype == 'image/jpg' ||
            file.mimetype == 'image/jpeg'
        ) {
            cb(null, true)
        } else {
            cb(null, false);
            return cb(new Error('Files can only be in png, jpg or jpeg formats'))
        }
    }
})

app.post('/auth/register', registerValidation, handleValidationErrors, UserController.register)
app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login)
app.get('/auth/me', checkAuth, UserController.getMe)
app.patch('/auth/uploadImage', checkAuth, upload.single('image'), UserController.uploadImage)

app.get('/products/getMainProducts', ProductController.getMainPageProducts)
app.get('/products/getRcmd', ProductController.getRcmdItems)
app.post('/products/add', ProductController.addProduct)
app.get('/products/getOne/:href', ProductController.getOne)
app.get('/products/search', ProductController.search)
app.get('/products/filters', ProductController.filters)
app.post('/products/reviews/add', checkAuth, ReviewsController.sendReview)
app.get('/products/reviews/:productId', ReviewsController.getReviews)
app.delete('/products/reviews/:id', checkAuth, ReviewsController.deleteReview)

app.get('/category', CategoryController.getAll)
app.get('/category/getMainCategories', CategoryController.getMainPageCategories)
app.get('/category/getCategoryPage', CategoryController.getCategoryPage)

app.post('/cart/add', checkAuth, CartController.addToCart)
app.delete('/cart/removeAll', checkAuth, CartController.removeAllFromCart)
app.delete('/cart/:id', checkAuth, CartController.removeFromCart)
app.patch('/cart/plusItem/:id', checkAuth, CartController.plusItem)
app.patch('/cart/minusItem/:id', checkAuth, CartController.minusItem)
app.patch('/cart/setQuantity', checkAuth, CartController.setQuantity)
app.get('/cart/getFull', checkAuth, CartController.getFullUserCart)
app.get('/cart', checkAuth, CartController.getUserCart)

app.post('/favorites/add', checkAuth, FavoritesController.addToFavorites)
app.get('/favorites/getFull', checkAuth, FavoritesController.getFullUserFavorites)
app.get('/favorites', checkAuth, FavoritesController.getUserFavorites)
app.delete('/favorites/:id', checkAuth, FavoritesController.removeFromFavorites)

app.post('/purchase', checkAuth, PurchaseController.purchase)
app.get('/purchase', checkAuth, PurchaseController.getPurchasedItems)

app.listen(process.env.PORT || 8080, (err) => {
    if (err) {
        return console.log(err);
    }

    console.log('Server OK');
})