// Import modules
import { connect } from 'mongoose'
import { logInfo, logError } from '../utils/loggers'

// Define a function to connect to a MongoDB database
const connectDB: (a: string) => void = (url: string) => {
  // Call the connect function with the URL
  connect(url)
    .then(() => logInfo('Connected to the DB...'))
    .catch((err) => logError(err))
}

// Export the connectDB function
export default connectDB
