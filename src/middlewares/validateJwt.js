import * as dotenv from 'dotenv'

import jwt from 'jsonwebtoken'
dotenv.config()

export default function validateJwt(req, res, next) {
  const token = req.header('x-token')

  if (!token) {
    return res.status(401).json({
      msg: 'No hay token en la peticion'
    })
  }

  const secret = process.env.JWT_SECRET
  if (!secret) {
    throw new Error('JWT_SECRET is not defined')
  }

  try {
    const payload = jwt.verify(token, secret)
    req.session = payload
  } catch (error) {
    return res.status(401).json({
      msg: 'Token no valido'
    })
  }

  next()
}
