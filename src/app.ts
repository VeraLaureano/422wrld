// Import modules
import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import routes from './config/routes'
import csurf from 'csurf'
import helmet from 'helmet'
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
import { apiLimiter } from './utils/limiter'
import { csfrRouter } from './routes/csfr.route'

// Create an Express application
const app = express()

const csrfProtection = csurf({ cookie: true})

// Set up middleware functions
app.use(express.json()) // Parse JSON request bodies
app.use(cors()) // Enable CORS
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser()) // Parse cookie headers
app.use(express.static('public')) // Public directory
app.use(apiLimiter)
app.use(csrfProtection)
app.use(helmet())

// Set up routing
app.use(routes.user, userRouter) // User routes
// app.use(routes.admin, restrictToAdminOnly, adminRouter) // Admin routes
app.use(routes.artists, authentication, artistsRouter) // Artist routes
app.use(routes.albums, authentication, albumRouter) // Album routes
app.use(routes.songs, songRouter) // Song routes
app.use(routes.csfr, csfrRouter)
app.use(routes.docs, serve, docsRouter)

// Set up 404 error handler
app.use(notFound)

// Export the Express application
export default app
