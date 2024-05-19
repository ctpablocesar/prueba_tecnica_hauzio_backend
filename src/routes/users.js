import { Router } from 'express'
import { body } from 'express-validator'
import { addNewUser, deleteUser, getUsers } from '../controllers/users.js'
import { validateFields } from '../middlewares/validateFields.js'
import validateJwt from '../middlewares/validateJwt.js'

const usersRouter = Router()

usersRouter.use(validateJwt)

usersRouter.get('/', getUsers)

usersRouter.post(
  '/',
  [
    body('name', 'Name is required').not().isEmpty(),
    body('email', 'Email is required').not().isEmpty().trim().toLowerCase(),
    body('email', 'Email is not valid').isEmail(),
    body('password', 'Password is required').not().isEmpty(),
    body('password', 'Password must be at least 6 characters long').isLength(6),
    validateFields
  ],
  addNewUser
)

usersRouter.delete('/:id', deleteUser)

export default usersRouter
