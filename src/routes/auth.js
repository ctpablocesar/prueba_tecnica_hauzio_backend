import { Router } from 'express'
import { body } from 'express-validator'
import { login } from '../controllers/auth.js'
import { validateFields } from '../middlewares/validateFields.js'

const authRouter = Router()

authRouter.post(
  '/',
  [
    body('email', 'Email is required').not().isEmpty().trim().toLowerCase(),
    body('email', 'Email is not valid').isEmail(),
    body('password', 'Password is required').not().isEmpty(),
    body('password', 'Password must be at least 6 characters long').isLength(6),
    validateFields
  ],
  login
)

export default authRouter
