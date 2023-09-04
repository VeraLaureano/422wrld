import 'dotenv/config'
import express, { Request, Response } from 'express'
import { artistsRouter } from './routes/artist.route'

const app = express()

// ROUTING
app.get('/', (_req: Request, res: Response) => {
  res.send('<h1>Welcome!</h1>')
})

app.use(`/api/${process.env.VERSION}/artists`, artistsRouter)

export default app