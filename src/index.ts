import app from './app'
import connectDB from './config/mongo'
import { createServer } from 'http'
import { MONGO_URI, PORT } from './config/env'
import { logInfo, logError } from './utils/loggers'

const server = createServer(app) 

const start: () => void = async () => {
  try {
    await connectDB(MONGO_URI as string)
    server.listen(PORT, (): void => {
      logInfo(`Server running on port ${PORT}...`)
      logInfo(`http://localhost:${PORT}/`)
    })
  } catch (err) {
    logError(err)
  }
}

start()