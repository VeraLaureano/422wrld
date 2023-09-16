import { deleteAlbumDocV1 } from './delete-album'
import { deleteArtistDocV1 } from './delete-artist'
import { deleteSongDocV1 } from './delete-song'
import { patchAlbumDocV1 } from './patch-album'
import { patchArtistDocV1 } from './patch-artist'
import { patchSongDocV1 } from './patch-song'
import { postAlbumsDocV1 } from './post-album'
import { postArtistDocV1 } from './post-artist'
import { postSongDocV1 } from './post-song'

export const adminDocsV1 = {
  paths: {
    '/api/v1/songs': {
      ...postSongDocV1
    },
    '/api/v1/songs/{id}': {
      ...patchSongDocV1,
      ...deleteSongDocV1
    },
    '/api/v1/albums': {
      ...postAlbumsDocV1
    },
    '/api/v1/albums/{id}': {
      ...patchAlbumDocV1,
      ...deleteAlbumDocV1
    },
    '/api/v1/artists': {
      ...postArtistDocV1
    },
    '/api/v1/artists/{id}': {
      ...patchArtistDocV1,
      ...deleteArtistDocV1
    },
  }
}