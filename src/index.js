import cors from 'cors'
import express from 'express'
import morgan from 'morgan'
import dbConfig from './database/config.js'
import authRouter from './routes/auth.js'
import storeLocationsRouter from './routes/storeLocations.js'
import usersRouter from './routes/users.js'

const app = express()

app.use(cors())

app.use(express.static('public'))

app.use(express.json())

app.use(morgan('dev'))

dbConfig()

app.use('/api/auth', authRouter)
app.use('/api/users', usersRouter)
app.use('/api/storeLocations', storeLocationsRouter)

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`server is listening on ${port}`)
})
