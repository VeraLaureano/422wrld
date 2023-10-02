// Import modules
import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import routes from './config/routes'
import { notFound } from './middlewares/notFound'
// import { restrictToAdminOnly } from './middlewares/admin'
import { authentication } from './middlewares/auth'
import { artistsRouter } from './routes/artist.route'
import { albumRouter } from './routes/album.route'
import { songRouter } from './routes/song.route'
import { userRouter } from './routes/user.route'
// import { adminRouter } from './routes/admin.route'
import { serve } from 'swagger-ui-express'
import { docsRouter } from './routes/docs.route'

// Create an Express application
const app = express()

// Set up middleware functions
app.use(express.json()) // Parse JSON request bodies
app.use(cors()) // Enable CORS
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser()) // Parse cookie headers
app.use(express.static('public')) // Public directory

// Set up routing
app.use(routes.user, userRouter) // User routes
// app.use(routes.admin, restrictToAdminOnly, adminRouter) // Admin routes
app.use(routes.artists, authentication, artistsRouter) // Artist routes
app.use(routes.albums, authentication, albumRouter) // Album routes
app.use(routes.songs, songRouter) // Song routes
app.use(routes.docs, serve, docsRouter)

// Set up 404 error handler
app.use(notFound)

// Export the Express application
export default app
