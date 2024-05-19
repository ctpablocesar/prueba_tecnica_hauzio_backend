import bcrypt from 'bcryptjs'
import { createJWT } from '../helpers/jwt.js'
import User from '../models/User.js'

export async function login(req, res) {
  const { role } = req.query
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (!user) {
    return res.status(404).json({
      message: 'Credenciales incorrectas'
    })
  }
  const isMatch = await bcrypt.compare(password, user.password)

  if (!isMatch) {
    return res.status(400).json({
      message: 'Credenciales incorrectas'
    })
  }

  const session = {
    uid: user._id,
    name: user.name,
    email: user.email
  }

  const token = await createJWT(session)

  res.status(200).json({
    message: 'Inicio de sesión exitoso',
    token
  })
}
