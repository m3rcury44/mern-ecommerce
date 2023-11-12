import ReviewModel from '../models/Review.js'

export const sendReview = async (req, res) => {
    try {
        const {text, productId} = req.body

        const existingReview = await ReviewModel.findOne({productId: productId})

        if (existingReview) {
            existingReview.reviews.push({user: req.userId, text: text})
            await existingReview.save()
            return res.json(existingReview)
        } else {
            const doc = new ReviewModel({
                productId: productId,
                reviews: {user: req.userId, text: text}
            })
    
            await doc.save()
    
            res.json(doc)
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: 'Failed to send review'
        })
    }
}

export const getReviews = async (req, res) => {
    try {
        const {productId} = req.params

        const result = await ReviewModel.findOne({productId: productId}).populate('reviews.user')

        res.json(result)
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: 'Failed to get reviews'
        })
    }
}

export const deleteReview = async (req, res) => {
    try {
        const {id} = req.params

        const result = await ReviewModel.findOneAndUpdate(
            {'reviews._id': id},
            {$pull: { reviews: {_id: id} } },
            {new: true}
        )

        if (result.reviews.length === 0) {
            await ReviewModel.deleteOne({ _id: result._id });

            return res.json({
                success: true
            });
        }

        if (!result) {
            return res.status(404).json({
                message: `You don't have a review`
            })
        }

        res.json(result)
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: 'Failed to delete review'
        })
    }
}