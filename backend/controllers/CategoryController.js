import CategoryModel from '../models/Category.js'

export const getAll = async (req, res) => {
    try {
        const categories = await CategoryModel.find()

        if (!categories) {
            res.status(404).json({
                message: 'Categories not found'
            })
        }

        res.json(categories)
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: 'Failed to get categories'
        })
    }
}

export const getMainPageCategories = async (req, res) => {
    try {
        const categories = await CategoryModel.find()

        if (!categories) {
            res.status(404).json({
                message: 'Categories not found'
            })
        }

        const result = categories.slice(0, 8)

        res.json(result)
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: 'Failed to get categories'
        })
    }
}

export const getCategoryPage = async (req, res) => {
    try {
        const categories = await CategoryModel.find()

        if (!categories) {
            res.status(404).json({
                message: 'Categories not found'
            })
        }

        const result = categories.map(item => ({
            _id: item._id,
            href: item.href,
        }))

        res.json(result)
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: 'Failed to get categories'
        })
    }
}