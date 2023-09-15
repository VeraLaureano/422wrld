// Import modules
import express, { Response } from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import routes from './config/routes'
import { notFound } from './middlewares/notFound'
import { restrictToAdminOnly } from './middlewares/admin'
import { AuthenticatedRequest } from './interfaces/authRequest.interface'
import { checkAuth, restrictTologgedInUserOnly } from './middlewares/auth'
import { artistsRouter } from './routes/artist.route'
import { albumRouter } from './routes/album.route'
import { songRouter } from './routes/song.route'
import { userRouter } from './routes/user.route'
import { adminRouter } from './routes/admin.route'
import { serve, setup } from 'swagger-ui-express'
import docs from './docs'

// Create an Express application
const app = express()

// Set up middleware functions
app.use(express.json()) // Parse JSON request bodies
app.use(cors()) // Enable CORS
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser()) // Parse cookie headers
app.use(express.static('public')) // Public directory

// Set up routing
app.get('/', checkAuth, (_req: AuthenticatedRequest, res: Response) => {
  // Home page
  return res.render('home')
})
app.use(routes.user, userRouter) // User routes
app.use(routes.admin, restrictToAdminOnly, adminRouter) // Admin routes
app.use(routes.artists, restrictTologgedInUserOnly, artistsRouter) // Artist routes
app.use(routes.albums, restrictTologgedInUserOnly, albumRouter) // Album routes
app.use(routes.songs,songRouter) // Song routes
app.use(routes.docs, serve, setup(docs))

// Set up 404 error handler
app.use(notFound)

// Export the Express application
export default app
