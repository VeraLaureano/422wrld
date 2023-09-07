import app from './app'
import { MONGO_URI, PORT } from './config/env'
import connectDB from './config/mongo'
import { info, error } from './utils/loggers'

const start: () => void = async () => {
  try {
    await connectDB(MONGO_URI as string)
    app.listen(PORT, (): void => {
      info(`Server running on port ${PORT}...`)
      info(`http://localhost:${PORT}/`)
    })
  } catch (err) {
    error(err)
  }
}

start()