import { config2 } from './config'

// path = user/login
// url = http://localhost:6969/
// http://localhost:6969/user/signin
export function createExpressUrl(path) {
  return `${config2.serverUrl}/${path}`
}