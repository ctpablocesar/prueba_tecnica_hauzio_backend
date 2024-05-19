import fs from 'fs'
import StoreLocation from '../models/StoreLocation.js'

export const getStoreLocations = async (req, res) => {
  const storeLocations = await StoreLocation.find()

  res.status(200).json(storeLocations)
}

export const addNewStoreLocation = async (req, res) => {
  const counter = await StoreLocation.countDocuments()

  if (counter >= 20) {
    return res.status(400).json({
      message: 'Solo se permite guardar 20 ubicaciones.'
    })
  }

  const { title, description, lat, lng } = req.body

  const newStoreLocation = new StoreLocation({
    title,
    description,
    lat,
    lng,
    image: req.file.filename
  })

  await newStoreLocation.save()

  res.status(200).json(newStoreLocation)
}

export const updateStoreLocation = async (req, res) => {
  const { id } = req.params
  const { title, description, lat, lng } = req.body

  const storeLocation = await StoreLocation.findById(id)

  if (storeLocation != null) {
    if (req.file) {
      await fs.unlinkSync(`public/uploads/${storeLocation.image}`, (err) => {
        if (err) {
          console.error('Error deleting previous image:', err)
        }
      })
    }
    const updatedStoreLocation = await StoreLocation.findByIdAndUpdate(
      id,
      {
        title,
        description,
        lat,
        lng,
        ...(req.file && { image: req.file.filename })
      },
      { new: true }
    )

    res.status(200).json(updatedStoreLocation)
  } else {
    res.status(404).json({
      message: 'Registro no encontrado.'
    })
  }
}

export const deleteStoreLocation = async (req, res) => {
  const { id } = req.params

  const storeLocation = await StoreLocation.findById(id)

  if (storeLocation != null) {
    await fs.unlinkSync(`public/uploads/${storeLocation.image}`, (err) => {
      if (err) {
        console.error('Error deleting previous image:', err)
      }
    })
    await StoreLocation.findByIdAndDelete(id)
    res.status(204).send()
  } else {
    res.status(404).json({
      message: 'Registro no encontrado.'
    })
  }
}
