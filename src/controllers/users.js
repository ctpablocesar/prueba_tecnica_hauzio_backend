import bcrypt from 'bcryptjs'
import User from '../models/User.js'

export const getUsers = async (req, res) => {
  const users = await User.find()

  res.status(200).json(users)
}

export const addNewUser = async (req, res) => {
  const { name, email, password } = req.body

  const usersCount = await User.countDocuments()

  if (usersCount >= 10) {
    return res.status(400).json({
      message: 'Solo se permite guardar 10 usuarios.'
    })
  }

  const userExists = await User.findOne({ email })
  if (userExists) {
    return res.status(400).json({
      message: 'El correo electrónico ya está en uso.'
    })
  }

  const passwordEncrypted = await bcrypt.hash(password, 10)

  const newUser = new User({
    name,
    email,
    password: passwordEncrypted
  })

  try {
    await newUser.save()
    res.status(200).json(newUser)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Error, llame al administrador.'
    })
  }
}

export const deleteUser = async (req, res) => {
  const { id } = req.params

  try {
    await User.findByIdAndDelete(id)
    res.status(204).send()
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Error, llame al administrador.'
    })
  }
}
