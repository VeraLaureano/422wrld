import { Router } from 'express'
import { deleteSong, getAllSongs, getOneSong, patchSong, postSong } from '../controllers/song.controller'

const router = Router()

router.route('/').get(getAllSongs).post(postSong)
router.route('/:id').get(getOneSong).patch(patchSong).delete(deleteSong)

export { router as songRouter }