import { Router } from 'express'
import { deleteUser, getAllUsers } from '../controllers/user.controller'
import { deleteSong, patchSong, postSong } from '../controllers/song.controller'
import { deleteAlbum, patchAlbum, postAlbum } from '../controllers/album.controller'
import { postArtist } from '../controllers/artist.controller'

const router = Router()

router.route('/user').get(getAllUsers)
router.route('/user/:id').delete(deleteUser)
router.route('/song').post(postSong)
router.route('/song/:id').patch(patchSong).delete(deleteSong)
router.route('/album').post(postAlbum)
router.route('/album/:id').patch(patchAlbum).delete(deleteAlbum)
router.route('/artist').post(postArtist)
router.route('/artist/:id').patch(patchAlbum).delete(deleteAlbum)

export { router as adminRouter}