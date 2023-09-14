import { Router } from 'express'
import { getAllAlbums, getOneAlbum } from '../controllers/album.controller'

const router = Router()

router.route('/').get(getAllAlbums)
router.route('/:id').get(getOneAlbum)

export { router as albumRouter }