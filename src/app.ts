// Import modules
import express, { Request, Response } from 'express'
import cors from 'cors'
import { notFound } from './middlewares/notFound'
import { artistsRouter } from './routes/artist.route'
import { albumRouter } from './routes/album.route'
import { songRouter } from './routes/song.route'
import { VERSION } from './config/env'
import { userRouter } from './routes/user.route'
import cookieParser from 'cookie-parser'

// Create an Express application
const app = express()

// Set up middleware functions
app.use(express.json()) // Parse JSON request bodies
app.use(cors()) // Enable CORS
app.use(cookieParser()) // Parse cookie headers

// Set up routing
app.get('/', (_req: Request, res: Response) => {
  // Home page
  res.send('<h1>Welcome!</h1>')
})
app.use(`/api/${VERSION}/user`, userRouter) // User routes
app.use(`/api/${VERSION}/artists`, artistsRouter) // Artist routes
app.use(`/api/${VERSION}/albums`, albumRouter) // Album routes
app.use(`/api/${VERSION}/songs`, songRouter) // Song routes

// Set up 404 error handler
app.use(notFound)

// Export the Express application
export default app
