import FavoritesModel from '../models/Favorites.js'

export const addToFavorites = async (req, res) => {
    try {
        const { productId } = req.body

        const filteredProducts = (arr) => arr.map(item => ({
            productId: item.productId
        }))

        const existingFavorites = await FavoritesModel.findOne({user: req.userId})

        if (existingFavorites) {
            const existingProduct = existingFavorites.products.find(item => item.productId.equals(productId));

            if (existingProduct) {

                await FavoritesModel.updateOne(
                    {user: req.userId},
                    {$pull: {products: {productId: productId}}}
                )

                const updatedFavorites = await FavoritesModel.findOne({user: req.userId})

                if (updatedFavorites.products == 0) {
                    await FavoritesModel.deleteOne({user: req.userId})

                    return res.json(filteredProducts(updatedFavorites.products))
                }

                return res.json(filteredProducts(updatedFavorites.products))
            }

            existingFavorites.products.push({productId})
            await existingFavorites.save()
            res.json(filteredProducts(existingFavorites.products))
        } else {
            const doc = new FavoritesModel({
                user: req.userId,
                products: {productId}
            })

            await doc.save()
           
            res.json(filteredProducts(doc.products))
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: 'Failed to add to favorites'
        })
    }
}

export const getFullUserFavorites = async (req, res) => {
    try {
        const findUser = await FavoritesModel.findOne({user: req.userId}).populate('products.productId')

        if (!findUser) {
            return res.json([])
        }

        const result = findUser.products.map(item => ({
            _id: item._id,
            productId: item.productId._id,
            category: item.productId.category,
            href: item.productId.href,
            title: item.productId.title,
            img: item.productId.img,
            price: item.productId.price,
            model: item.productId.model,
            color: item.productId.color
        }))

        res.json(result)
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: 'Failed to get favorites'
        })
    }
}

export const getUserFavorites = async (req, res) => {
    try {
        const findUser = await FavoritesModel.findOne({user: req.userId})

        if (!findUser) {
            return res.json([])
        }

        const result = findUser.products.map(item => ({productId: item.productId}));

        res.json(result)
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: 'Failed to get favorites'
        })
    }
}

export const removeFromFavorites = async (req, res) => {
    try {
        const itemId = req.params.id

        const updateResult = await FavoritesModel.updateOne(
            { 'products.productId': itemId },
            { $pull: { products: {productId: itemId} } }
        );

        if (updateResult.nModified === 0) {
            return res.status(404).json({
                message: 'Item not found'
            });
        }

        const findOne = await FavoritesModel.findOne({user: req.userId})

        if (findOne.products == 0) {
            await FavoritesModel.deleteOne({user: req.userId})

            return res.json({
                success: true
            })
        }

        res.json(findOne)
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: 'Failed to remove item from favorites'
        })
    }
}