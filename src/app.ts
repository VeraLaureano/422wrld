import 'dotenv/config'
import express, { Request, Response, json } from 'express'
import cors from 'cors'
import { artistsRouter } from './routes/artist.route'
import { notFound } from './middlewares/notFound'
import { songRouter } from './routes/song.route'

const app = express()

app.use(json())
app.use(cors())

// ROUTING
app.get('/', (_req: Request, res: Response) => {
  res.send('<h1>Welcome!</h1>')
})

app.use(`/api/${process.env.VERSION}/artists`, artistsRouter)
app.use(`/api/${process.env.VERSION}/songs`, songRouter)

app.use(notFound)

export default app