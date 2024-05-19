import mongoose from 'mongoose'
const { Schema } = mongoose

const StoreLocationSchema = Schema(
  {
    title: {
      type: String,
      require: true
    },
    description: {
      type: String,
      require: true
    },
    lat: {
      type: String,
      require: true
    },
    lng: {
      type: String,
      require: true
    },
    image: {
      type: String,
      require: true
    }
  },
  { timestamps: true }
)

export default mongoose.model('StoreLocation', StoreLocationSchema)
