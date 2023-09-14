import { Router } from 'express'
import { getAllArtists, getOneArtist } from '../controllers/artist.controller'

const router = Router()

router.route('/').get(getAllArtists)
router.route('/:id').get(getOneArtist)

export { router as artistsRouter }