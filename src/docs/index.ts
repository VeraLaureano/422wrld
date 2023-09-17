import { basicInfo } from './basicInfo'
import { docsPaths } from './paths'
import { servers } from './servers'
import { tags } from './tags'
import { songID, albumID, artistID, Song, Album, Artist, User, ISError, Delete, Unauthorized } from './components'

const schemas = {
  components: {
    schemas: {
      songID, albumID, artistID, Song, Album, Artist, User, ISError, Delete, Unauthorized 
    }
  }
}

export const setupDocs = {
  ...basicInfo,
  ...servers,
  ...schemas,
  ...tags,
  ...docsPaths
}
