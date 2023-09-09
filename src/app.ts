import express, { Request, Response } from 'express'
import cors from 'cors'
import { notFound } from './middlewares/notFound'
import { artistsRouter } from './routes/artist.route'
import { albumRouter } from './routes/album.route'
import { songRouter } from './routes/song.route'
import { VERSION } from './config/env'
import { userRouter } from './routes/user.route'
import cookieParser from 'cookie-parser'
// import { checkAuth, restrictTologgedInUserOnly } from './middlewares/auth'

const app = express()

// MIDDLEWARES
app.use(express.json())
app.use(cors())
app.use(cookieParser())

// ROUTING
app.get('/', (_req: Request, res: Response) => {
  // home
  res.send('<h1>Welcome!</h1>')
})
app.use(`/api/${VERSION}/user`, userRouter)
// app.use(`/api/${VERSION}/profile`, restrictTologgedInUserOnly,profileRouter)
app.use(`/api/${VERSION}/artists`, artistsRouter)
app.use(`/api/${VERSION}/albums`, albumRouter)
app.use(`/api/${VERSION}/songs`, songRouter)

// 404
app.use(notFound)

export default app