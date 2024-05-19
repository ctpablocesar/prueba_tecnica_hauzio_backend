import jwt from 'jsonwebtoken'

export function createJWT(payload) {
  const secret = process.env.JWT_SECRET
  const expiresIn = '2h'
  if (!secret) {
    throw new Error('JWT_SECRET is not defined')
  } else {
    const token = jwt.sign(payload, secret, { expiresIn })
    return token
  }
}
