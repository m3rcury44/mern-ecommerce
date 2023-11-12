import ProductModel from '../models/Product.js'
import CategoryModel from '../models/Category.js'

export const getMainPageProducts = async (req, res) => {
    try {
        const products = await ProductModel.find()
        const categories = await CategoryModel.find()

        const result = categories.slice(0, 2)
            .map(item => products
                .filter(product => product.category === item.href)
                .map(item => ({
                    _id: item._id,
                    title: item.title,
                    category: item.category,
                    href: item.href,
                    img: item.img,
                }))).flat()

        if (!products) {
            return res.status(404).json({
                message: 'Something went wrong'
            })
        }

        res.json(result)
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: 'Something went wrong'
        })
    }
}

export const getRcmdItems = async (req, res) => {
    try {
        const products = await ProductModel.find()

        const randomStr = String(Math.random())

        const start = Number(randomStr[2])
        const end = start + 10

        const result = products.slice(start, end).map(item => ({
            _id: item._id,
            title: item.title,
            category: item.category,
            href: item.href,
            img: item.img,
            price: item.price
        }))

        if (!products) {
            return res.status(404).json({
                message: 'Something went wrong'
            })
        }

        res.json(result)
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: 'Something went wrong'
        })
    }
}

export const getOne = async (req, res) => {
    try {
        const href = req.params.href

        const products = await ProductModel.findOne({
            href: href
        })

        if (!products) {
            return res.status(404).json({
                message: 'Product not found'
            })
        }

        res.json(products)
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: 'Failed to get product'
        })
    }
}

export const search = async (req, res) => {
    try {
        const {query} = req.query

        if (!query.length) {
            return res.json([])
        }

        const products = await ProductModel.find({
            title: {
                $regex: query,
                $options: 'i'
            }
        })

        if (query.length > 20) {
            return res.status(404).json({
                message: 'Your request is too long'
            })
        }

        if (!products) {
            res.status(404).json({
                message: 'Products not found'
            })
        }

        res.json(products)
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: 'Failed to get products'
        })
    }
}


export const filters = async (req, res) => {
    try {
        const {category, page, searchByMinPrice, searchByMaxPrice, brand, sortByPrice} = req.query

        const itemsPerPage = 6
        const pageNumber = parseInt(page) || 1

        const skipItems = (pageNumber - 1) * itemsPerPage

        const categoryProducts = await ProductModel.find({
            category: category
        })

        const result = categoryProducts.filter(item => {
            const isBrandFiltered = brand?.length > 0 && !brand?.includes(item.brand);
            const isMinPriceFiltered = searchByMinPrice?.length > 0 && item.price < Number(searchByMinPrice);
            const isMaxPriceFiltered = searchByMaxPrice?.length > 0 && item.price <= Number(searchByMaxPrice);
            const isPriceFiltered = isMinPriceFiltered || !isMaxPriceFiltered

            return !(isBrandFiltered || isPriceFiltered);
        })

        const filteredProducts = result
            .map(item => ({
                _id: item._id,
                img: item.img,
                title: item.title,
                price: item.price,
                description: item.description,
                brand: item.brand,
                href: item.href
            }))
            .slice(skipItems, skipItems + 6)
            .sort((a, b) => {
                if (sortByPrice === 'asc') {
                    return b.price > a.price ? -1 : 0
                }
                if (sortByPrice === 'desc') {
                    return b.price < a.price ? -1 : 0
                }
            })

        const categories = await CategoryModel.find({
            href: category
        })

        const filteredCategories = categories.map(item => ({
            _id: item._id,
            title: item.title,
            href: item.href,
            brands: item.brands
        }))

        if (!categoryProducts.length) {
            return res.status(404).json({
                message: 'Products not found'
            })
        }

        res.json({
            products: filteredProducts,
            category: {...filteredCategories}[0],
            filteredLength: result.length,
            categoryLength: categoryProducts.length
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: 'Failed to get products'
        })
    }
}

export const addProduct = async (req, res) => {
    try {
        const {title, img, href, price, category, type, material, size, color, description, brand} = req.body

        const doc = new ProductModel({
            title,
            img,
            href,
            price,
            category,
            type,
            material,
            size,
            color,
            description,
            brand,
            model: '#' + String(Math.random()).substring(2),
            certificate: 'ISO-' + String(Math.random()).substring(2)
        })

        await doc.save()

        res.json(doc)
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: 'Something went wrong'
        })
    }
}