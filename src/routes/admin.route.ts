import { Router } from 'express'
import { deleteUser, getAllUsers } from '../controllers/user.controller'
import { deleteSong, patchSong, postSong } from '../controllers/song.controller'
import { deleteAlbum, patchAlbum, postAlbum } from '../controllers/album.controller'
import { postArtist } from '../controllers/artist.controller'

// Create a new router object
const router = Router()

// Define routes for user-related operations
router.route('/user').get(getAllUsers)
router.route('/user/:id').delete(deleteUser)

// Define routes for song-related operations
router.route('/songs').post(postSong)
router.route('/songs/:id').patch(patchSong).delete(deleteSong)

// Define routes for album-related operations
router.route('/albums').post(postAlbum)
router.route('/albums/:id').patch(patchAlbum).delete(deleteAlbum)

// Define routes for artist-related operations
router.route('/artists').post(postArtist)
router.route('/artists/:id').patch(patchAlbum).delete(deleteAlbum)

// Export the router object as adminRouter
export { router as adminRouter}
