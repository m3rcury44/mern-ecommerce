import {body} from 'express-validator'

export const registerValidation = [
    body('name', 'The name must be at least 2 characters').isLength({min: 2, max: 12}),
    body('password', 'The password must be at least 5 characters').isLength({min: 5}),
    body('avatarUrl', 'Invalid link to the avatar').optional().isURL(),
]

export const loginValidation = [
    body('name', 'Invalid name or password').isLength({min: 2, max: 12}),
    body('password', 'Invalid name or password').isLength({min: 5}),
]