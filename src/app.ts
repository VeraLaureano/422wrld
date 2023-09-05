import 'dotenv/config'
import express, { Request, Response, json } from 'express'
import cors from 'cors'
import { notFound } from './middlewares/notFound'
import { artistsRouter } from './routes/artist.route'
import { albumRouter } from './routes/album.route'
import { songRouter } from './routes/song.route'

const app = express()

app.use(json())
app.use(cors())

// ROUTING
app.get('/', (_req: Request, res: Response) => {
  // home
  res.send('<h1>Welcome!</h1>')
})
app.use(`/api/${process.env.VERSION}/artists`, artistsRouter)
app.use(`/api/${process.env.VERSION}/albums`, albumRouter)
app.use(`/api/${process.env.VERSION}/songs`, songRouter)

// 404
app.use(notFound)

export default app