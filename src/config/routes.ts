import { VERSION } from './env'

const routes = {
  user: `/api/${VERSION}/user`,
  admin: `/api/${VERSION}/admin`,
  artists: `/api/${VERSION}/artists`,
  albums: `/api/${VERSION}/albums`,
  songs: `/api/${VERSION}/songs`,
  docs: '/api-docs',
  secret: `/api/${VERSION}/dev/v3r4_l4ur1`
}

export default routes