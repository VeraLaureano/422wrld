// Import modules
import express, { Response } from 'express'
import cors from 'cors'
import { notFound } from './middlewares/notFound'
import { artistsRouter } from './routes/artist.route'
import { albumRouter } from './routes/album.route'
import { songRouter } from './routes/song.route'
import { VERSION } from './config/env'
import { userRouter } from './routes/user.route'
import cookieParser from 'cookie-parser'
import { join } from 'path'
import { checkAuth, restrictTologgedInUserOnly } from './middlewares/auth'
import { AuthenticatedRequest } from './interfaces/authRequest.interface'
import { adminRouter } from './routes/admin.route'
import { restrictToAdminOnly } from './middlewares/admin'

// Create an Express application
const app = express()

// Set view engine
app.set('view engine', 'ejs')
app.set('views', join(__dirname, '../public/views'))

// Set up middleware functions
app.use(express.json()) // Parse JSON request bodies
app.use(cors()) // Enable CORS
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser()) // Parse cookie headers

// Set up routing
app.get('/', checkAuth, (_req: AuthenticatedRequest, res: Response) => {
  // Home page
  return res.render('home')
})
app.use(`/api/${VERSION}/user`, userRouter) // User routes
app.use(`/api/${VERSION}/admin`, restrictToAdminOnly, adminRouter) // Admin routes
app.use(`/api/${VERSION}/artists`, restrictTologgedInUserOnly, artistsRouter) // Artist routes
app.use(`/api/${VERSION}/albums`, restrictTologgedInUserOnly, albumRouter) // Album routes
app.use(`/api/${VERSION}/songs`, restrictTologgedInUserOnly,songRouter) // Song routes

// Set up 404 error handler
app.use(notFound)

// Export the Express application
export default app
