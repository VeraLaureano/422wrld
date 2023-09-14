import { Router } from 'express'
import { getAllSongs, getOneSong } from '../controllers/song.controller'

const router = Router()

router.route('/').get(getAllSongs)
router.route('/:id').get(getOneSong)

export { router as songRouter }