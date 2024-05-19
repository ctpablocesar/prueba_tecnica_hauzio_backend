import { Router } from 'express'
import { body } from 'express-validator'
import multer from 'multer'
import path from 'path'
import {
  addNewStoreLocation,
  deleteStoreLocation,
  getStoreLocations,
  updateStoreLocation
} from '../controllers/storeLocations.js'
import { validateFields } from '../middlewares/validateFields.js'
import validateJwt from '../middlewares/validateJwt.js'

const storeLocationsRouter = Router()

storeLocationsRouter.get('/', getStoreLocations)

storeLocationsRouter.use(validateJwt)

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/')
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname)
    )
  }
})
const upload = multer({ storage: storage })

storeLocationsRouter.post(
  '/',
  upload.single('image'),
  [
    body('lat', 'lat is required').not().isEmpty(),
    body('lng', 'lng is required').not().isEmpty(),
    body('lat').isFloat(),
    body('lng').isFloat(),
    body('title')
      .isString()
      .withMessage('Title must be a string')
      .notEmpty()
      .withMessage('Title cannot be empty'),
    body('description')
      .isString()
      .withMessage('Description must be a string')
      .notEmpty()
      .withMessage('Description cannot be empty'),
    body('image').custom((value, { req }) => {
      if (!req.file) {
        throw new Error('Image is required')
      }
      return true
    }),
    validateFields
  ],
  addNewStoreLocation
)

storeLocationsRouter.put('/:id', upload.single('image'), updateStoreLocation)

storeLocationsRouter.delete('/:id', deleteStoreLocation)

export default storeLocationsRouter
