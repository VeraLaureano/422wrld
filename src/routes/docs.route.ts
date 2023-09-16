import { Router } from 'express'
import { setup } from 'swagger-ui-express'
import { setupSongsDocs } from '../docs'

const router = Router()

router.route('/').get()
router.route('/songs').get(setup(setupSongsDocs))

export { router as docsRouter }