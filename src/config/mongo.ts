import { connect } from 'mongoose'
import { info, error } from '../utils/loggers'

const connectDB: (a: string) => void = (url: string) => {
  connect(url)
    .then(() => info('Connected to the DB...'))
    .catch((err) => error(err))
}

export default connectDB