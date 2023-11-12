import jwt from 'jsonwebtoken'
import UserModel from '../models/User.js'
import bcrypt from 'bcrypt'

export const register = async (req, res) => {
    const name = req.body.name
    try {
        const existingUser = await UserModel.findOne({name})

        if (existingUser) {
            return res.status(409).json({
                message: 'A user with this name already exists'
            })
        }

        const password = req.body.password
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)

        const doc = new UserModel({
            name: name,
            passwordHash: hash,
            avatarUrl: req.body.avatarUrl
        })

        const user = await doc.save()

        const token = jwt.sign({
                _id: user._id
            },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: '30d'
            })

        const {passwordHash, ...userData} = user._doc

        res.json({
            ...userData,
            token
        })

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: 'Failed to register'
        })
    }
}

export const login = async (req, res) => {
    try {
        const user = await UserModel.findOne({name: req.body.name})

        if (!user) {
            return res.status(400).json({
                message: 'Invalid name or password'
            })
        }

        const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash)

        if (!isValidPass) {
            return res.status(400).json({
                message: 'Invalid name or password'
            })
        }

        const token = jwt.sign({
                _id: user._id
            },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: '30d'
            })

        const {passwordHash, ...userData} = user._doc

        res.json({
            ...userData,
            token
        })

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: 'Failed to auth'
        })
    }
}

export const getMe = async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId)

        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            })
        }

        const {passwordHash, ...userData} = user._doc

        res.json(userData)

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: 'No access'
        })
    }
}

export const uploadImage = async (req, res) => {
    try {
        const addImage = await UserModel.findOneAndUpdate(
            {_id: req.userId},
            {$set: {avatarUrl: req.file.originalname}},
            {new: true}
        )

        res.json(addImage)
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: 'Failed to upload image'
        })
    }
}