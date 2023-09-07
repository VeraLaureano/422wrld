import app from './app'
import { MONGO_URI, PORT } from './config/env'
import connectDB from './config/mongo'

const start: () => void = async () => {
  try {
    await connectDB(MONGO_URI as string)
    app.listen(PORT, (): void => {
      console.log(`Server running on port ${PORT}...`)
      console.log(`http://localhost:${PORT}/`)
    })
  } catch (error) {
    console.error(error)
  }
}

start()