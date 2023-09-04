import { Router } from 'express'
import { deleteArtist, getAllArtists, getOneArtist, patchArtist, postArtist } from '../controllers/artist.controller'

const router = Router()

router.route('/').get(getAllArtists).post(postArtist)
router.route('/:id').get(getOneArtist).patch(patchArtist).delete(deleteArtist)

export { router as artistsRouter }