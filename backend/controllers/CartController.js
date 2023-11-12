import CartItemModel from '../models/Cart.js'

export const addToCart = async (req, res) => {
    try {
        const {productId, quantity} = req.body;

        const totalQuantity = (arr) => {
            return Array.isArray(arr) ? arr.reduce((sum, item) => item.quantity + sum, 0) : 0
        }

        const existingCartItem = await CartItemModel.findOne({user: req.userId})

        if (existingCartItem) {
            const existingProduct = existingCartItem.products.find(item => item.productId.equals(productId));

            if (existingProduct) {
                existingProduct.quantity++;
                await existingCartItem.save();

                return res.json(totalQuantity(existingCartItem.products));
            }

            existingCartItem.products.push({productId, quantity})
            await existingCartItem.save()

            res.json(totalQuantity(existingCartItem.products))
        } else {
            const cartItem = new CartItemModel({
                user: req.userId,
                products: {productId, quantity},
            });

            await cartItem.save();

            res.json(totalQuantity(cartItem.products));
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({message: 'Failed to add to cart'});
    }
}

export const plusItem = async (req, res) => {
    try {
        const cartItemId = req.params.id

        const result = await CartItemModel.findOneAndUpdate(
            {'products._id': cartItemId},
            {$inc: {'products.$.quantity': 1}},
            {new: true}
        );

        if (!result) {
            return res.status(404).json({
                message: 'Item not found'
            });
        }

        res.json(result);
    } catch (err) {
        console.log(err);
        return res.status(500).json({message: 'Failed to add one item to cart'});
    }
}

export const minusItem = async (req, res) => {
    try {
        const cartItemId = req.params.id

        const result = await CartItemModel.findOneAndUpdate(
            {'products._id': cartItemId},
            {$inc: {'products.$.quantity': -1}},
            {new: true}
        );

        if (!result) {
            return res.status(404).json({
                message: 'Item not found'
            });
        }

        const findOne = await CartItemModel.findOne({'products._id': cartItemId})

        if (findOne.products.find(item => item.quantity === 0)) {
            await CartItemModel.updateOne(
                {'products._id': cartItemId},
                {$pull: {products: {_id: cartItemId}}},
                {new: true}
            );

            return res.json({
                success: true
            })
        }

        res.json(result);
    } catch (err) {
        console.log(err);
        return res.status(500).json({message: 'Failed to remove one item to cart'});
    }
}

export const setQuantity = async (req, res) => {
    try {
        const {quantity, cartItemId} = req.body

        const result = await CartItemModel.findOneAndUpdate(
            {'products._id': cartItemId},
            {$set: {'products.$.quantity': quantity}},
            {new: true}
        );

        if (!result) {
            return res.status(404).json({
                message: 'Item not found'
            });
        }

        const findOne = await CartItemModel.findOne({'products._id': cartItemId})

        if (findOne.products.find(item => item.quantity <= 0)) {
            await CartItemModel.updateOne(
                {'products._id': cartItemId},
                {$pull: {products: {_id: cartItemId}}},
                {new: true}
            );

            return res.json({
                success: true
            })
        }

        res.json(result);
    } catch (err) {
        console.log(err);
        return res.status(500).json({message: 'Failed to set quantity of item'});
    }
}

export const getFullUserCart = async (req, res) => {
    try {
        const userCart = await CartItemModel.find({user: req.userId}).populate('products.productId');
        const products = userCart.map(item =>
            item.products.map(productItem => ({
                _id: productItem._id,
                productId: productItem.productId._id,
                quantity: productItem.quantity,
                category: productItem.productId.category,
                price: productItem.productId.price,
                color: productItem.productId.color,
                material: productItem.productId.material,
                size: productItem.productId.size,
                img: productItem.productId.img,
                title: productItem.productId.title,
                href: productItem.productId.href
            }))
        );

        if (!products.length) {
            return res.json([])
        }

        res.json(...products);
    } catch (err) {
        console.log(err);
        return res.status(500).json({message: 'Failed to get cart'});
    }
}

export const getUserCart = async (req, res) => {
    try {
        const userCart = await CartItemModel.find({user: req.userId})
        const products = userCart.map(item => item.products).flat();

        const totalQuantity = Array.isArray(products) ? products.reduce((sum, item) => item.quantity + sum, 0) : 0

        res.json(totalQuantity);
    } catch (err) {
        console.log(err);
        return res.status(500).json({message: 'Failed to get cart'});
    }
}

export const removeFromCart = async (req, res) => {
    try {
        const cartItemId = req.params.id

        const result = await CartItemModel.updateOne(
            {'products._id': cartItemId},
            {$pull: {products: {_id: cartItemId}}}
        );

        if (result.nModified === 0) {
            return res.status(404).json({
                message: 'Item not found'
            });
        }

        const findOne = await CartItemModel.findOne({user: req.userId})

        if (findOne.products == 0) {
            await CartItemModel.deleteOne({user: req.userId})

            return res.json({
                success: true
            })
        }

        res.json(findOne);
    } catch (err) {
        console.log(err);
        return res.status(500).json({message: 'Failed to remove item from cart'});
    }
}

export const removeAllFromCart = async (req, res) => {
    try {
        const result = await CartItemModel.deleteOne({user: req.userId});

        if (!result.deletedCount) {
            return res.status(404).json({
                message: 'Cart is empty'
            });
        }

        res.json({
            success: true
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: 'Failed to empty cart'
        });
    }
}