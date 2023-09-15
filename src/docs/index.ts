import { basicInfo } from './basicInfo'
import { components } from './components'
import { servers } from './servers'
import { songDocsV1 } from './song'
import { tags } from './tags'

const docs = {
  ...basicInfo,
  ...servers,
  ...components,
  ...tags,
  ...songDocsV1
}

export default docs