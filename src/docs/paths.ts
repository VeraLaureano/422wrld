import { getOneAlbumDocV1 } from './album/get-album'
import { getAllAlbumDocV1 } from './album/get-albums'
import { getOneArtistDocV1 } from './artist/get-artist'
import { getAllArtistsDocV1 } from './artist/get-artists'
import { getOneSongDocV1 } from './song/get-song'
import { getAllSongsDocV1 } from './song/get-songs'
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
    }
  }
}