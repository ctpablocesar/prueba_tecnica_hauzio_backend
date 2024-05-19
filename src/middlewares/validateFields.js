import response from 'express'
import { validationResult } from 'express-validator'

export const validateFields = (req, res = response, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    console.log(errors)
    return res.status(400).json({
      message: 'Error, faltan campos por llenar',
      errors: errors.mapped()
    })
  }

  next()
}
