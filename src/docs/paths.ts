import { deleteAlbumDocV1 } from './album/delete-album'
import { getOneAlbumDocV1 } from './album/get-album'
import { getAllAlbumDocV1 } from './album/get-albums'
import { patchAlbumDocV1 } from './album/patch-album'
import { postAlbumsDocV1 } from './album/post-album'
import { deleteArtistDocV1 } from './artist/delete-artist'
import { getOneArtistDocV1 } from './artist/get-artist'
import { getAllArtistsDocV1 } from './artist/get-artists'
import { patchArtistDocV1 } from './artist/patch-artist'
import { postArtistDocV1 } from './artist/post-artist'
import { deleteSongDocV1 } from './song/delete-song'
import { getOneSongDocV1 } from './song/get-song'
import { getAllSongsDocV1 } from './song/get-songs'
import { patchSongDocV1 } from './song/patch-song'
import { postSongDocV1 } from './song/post-song'
import { postLoginUserDocV1 } from './user/login-user'
import { postSignupUserDocV1 } from './user/signup-user'

export const docsPaths = {
  paths: {
    '/api/v1/user/login': {
      ...postLoginUserDocV1
    },
    '/api/v1/user/signup': {
      ...postSignupUserDocV1
    },
    '/api/v1/songs': {
      ...getAllSongsDocV1
    },
    '/api/v1/songs/{id}': {
      ...getOneSongDocV1
    },
    '/api/v1/albums': {
      ...getAllAlbumDocV1
    },
    '/api/v1/albums/{id}': {
      ...getOneAlbumDocV1
    },    
    '/api/v1/artists': {
      ...getAllArtistsDocV1
    },
    '/api/v1/artists/{id}': {
      ...getOneArtistDocV1
    },
    '/api/v1/admin/songs': {
      ...postSongDocV1
    },
    '/api/v1/admin/songs/{id}': {
      ...patchSongDocV1,
      ...deleteSongDocV1
    },
    '/api/v1/admin/albums': {
      ...postAlbumsDocV1
    },
    '/api/v1/admin/albums/{id}': {
      ...patchAlbumDocV1,
      ...deleteAlbumDocV1
    },
    '/api/v1/admin/artists': {
      ...postArtistDocV1
    },
    '/api/v1/admin/artists/{id}': {
      ...patchArtistDocV1,
      ...deleteArtistDocV1
    },
  }
}