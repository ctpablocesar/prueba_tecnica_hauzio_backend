import * as dotenv from 'dotenv'
import mongoose from 'mongoose'
dotenv.config()

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/test-db'

export default async function dbConfig() {
  try {
    await mongoose.connect(uri)
    console.log('Database connected')
  } catch (error) {
    console.log('Error connecting to database', error)
  }
}
