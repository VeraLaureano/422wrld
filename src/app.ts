import 'dotenv/config'
import express, { Request, Response } from 'express'

const app = express()

app.get('/', (_req: Request, res: Response) => {
    res.send('<h1>Welcome!</h1>')
})

app.listen(process.env.PORT, (): void => {
    console.log(`Server running on port ${process.env.PORT}...`)
    console.log(`http://localhost:${process.env.PORT}/`)
})