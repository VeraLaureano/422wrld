import { Router } from 'express'
import { setup } from 'swagger-ui-express'
import { setupAdminDocs, setupSongsDocs } from '../docs'

const router = Router()

router.route('/').get()
router.route('/songs').get(setup(setupSongsDocs))
router.route('/admin').get(setup(setupAdminDocs))

export { router as docsRouter }