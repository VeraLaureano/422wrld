import { connect } from 'mongoose'

const connectDB: (a: string) => void = (url: string) => {
  connect(url)
    .then(() => console.log('Connected to the DB...'))
    .catch((error) => console.error(error))
}

export default connectDB