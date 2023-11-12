import CartItemModel from '../models/Cart.js'
import PurchasedItemsModel from '../models/PurchasedItems.js'

export const purchase = async (req, res) => {
    try {
        const userCart = await CartItemModel.findOne({user: req.userId})

        const productIds = userCart.products.map(item => ({
            productId: item.productId,
            quantity: item.quantity
        }))

        const existingUser = await PurchasedItemsModel.findOne({user: req.userId})
        await CartItemModel.deleteOne({user: req.userId});

        if (existingUser) {
            const updatedProducts = existingUser.products;

            for (const product of productIds) {
                const existingProduct = updatedProducts.find(item =>
                    item.productId.equals(product.productId)
                );
                if (existingProduct) {
                    existingProduct.quantity += product.quantity;
                } else {
                    updatedProducts.push(product);
                }
            }

            await PurchasedItemsModel.updateOne(
                {user: req.userId},
                {$set: {products: existingUser.products}}
            );
            res.json(existingUser.products);
        } else {
            const doc = new PurchasedItemsModel({
                user: req.userId,
                products: productIds
            });

            await doc.save();

            res.json(doc.products);
        }

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: 'Failed to buy products'
        })
    }
}

export const getPurchasedItems = async (req, res) => {
    try {
        const {limit} = req.query

        const purchasedItems = await PurchasedItemsModel.findOne({user: req.userId}).populate('products.productId')

        if (!purchasedItems) {
            return res.json([])
        }

        const result = purchasedItems.products.slice(0, limit).map(product => product.productId.map(item => ({
            productId: item._id,
            title: item.title,
            img: item.img,
            href: item.href,
            price: item.price,
            category: item.category,
            quantity: product.quantity
        }))).flat()

        res.json(result)
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: 'Failed to get products'
        })
    }
}