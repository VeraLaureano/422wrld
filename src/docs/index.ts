import { adminDocsV1 } from './admin'
import { adminComponents } from './admin/adminComponents'
import { basicInfo } from './basicInfo'
import { servers } from './servers'
import { songDocsV1 } from './song'
import { songComponents } from './song/songComponents'
import { tags } from './tags'

export const setupSongsDocs = {
  ...basicInfo,
  ...servers,
  ...songComponents,
  ...tags[0],
  ...songDocsV1
}

export const setupAdminDocs = {
  ...basicInfo,
  ...servers,
  ...adminComponents,
  ...tags[1],
  ...adminDocsV1
}