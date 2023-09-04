import app from './app'
import connectDB from './config/mongo'

const start: () => void = async () => {
  try {
    await connectDB(process.env.MONGO_URI as string)
    app.listen(process.env.PORT, (): void => {
      console.log(`Server running on port ${process.env.PORT}...`)
      console.log(`http://localhost:${process.env.PORT}/`)
    })
  } catch (error) {
    console.error(error)
  }
}

start()