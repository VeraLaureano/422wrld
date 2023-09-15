import { getOneSongDocV1 } from './get-song'
import { getAllSongsDocV1 } from './get-songs'

export const songDocsV1 = {
  paths: {
    '/api/v1/songs': {
      ...getAllSongsDocV1
    },
    '/api/v1/songs/{id}': {
      ...getOneSongDocV1
    }
  }
}