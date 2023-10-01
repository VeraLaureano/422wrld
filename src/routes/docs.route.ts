import { Router } from 'express'
import { setup } from 'swagger-ui-express'
import { setupDocs } from '../docs'

const router = Router()

router.route('/').get(setup(setupDocs))

export { router as docsRouter }