import { Router } from 'express'
import { deleteAlbum, getAllAlbums, getOneAlbum, patchAlbum, postAlbum } from '../controllers/album.controller'

const router = Router()

router.route('/').get(getAllAlbums).post(postAlbum)
router.route('/:id').get(getOneAlbum).patch(patchAlbum).delete(deleteAlbum)

export { router as albumRouter }