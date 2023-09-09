// Import modules
import app from './app'
import connectDB from './config/mongo'
import { createServer } from 'http'
import { MONGO_URI, PORT } from './config/env'
import { logInfo, logError } from './utils/loggers'

// Create a server using the app module
const server = createServer(app) 

// Define a function to start the server
const start: () => void = async () => {
  try {
    // Connect to MongoDB using the MONGO_URI constant
    await connectDB(MONGO_URI as string)

    // Start the server and log information about it
    server.listen(PORT, (): void => {
      logInfo(`Server running on port ${PORT}...`)
      logInfo(`http://localhost:${PORT}/`)
    })
  } catch (err) {
    // Log an error message if there is an error
    logError(err)
  }
}

// Call the start function to start the server
start()
