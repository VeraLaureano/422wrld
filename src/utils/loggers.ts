import { NODE_ENV } from '../config/env'

export const logInfo = (...params: [string]) => {
  if (NODE_ENV === 'development') {
    console.log(...params)
  }
}

export const logError = (...params: [unknown]) => {
  if (NODE_ENV === 'development') {
    console.error(...params)
  }
}