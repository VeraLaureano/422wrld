import { Request, Response, Router } from 'express'
import { logError } from '../utils/loggers'

const router = Router()

const getCsfr = async (req: Request, res: Response) => {
  try {
    return res.json({ csrfToken: req.csrfToken() })    
  } catch (error) {
    logError(error)
  }
}

router.route('/').get(getCsfr)

export { router as csfrRouter }