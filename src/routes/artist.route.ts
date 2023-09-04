import { Router } from 'express'

const router = Router()

router.route('/').get().post()
router.route('/:id').get().patch().delete()

export { router as artistsRouter }