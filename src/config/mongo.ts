import { connect } from 'mongoose'
import { logInfo, logError } from '../utils/loggers'

const connectDB: (a: string) => void = (url: string) => {
  connect(url)
    .then(() => logInfo('Connected to the DB...'))
    .catch((err) => logError(err))
}

export default connectDB