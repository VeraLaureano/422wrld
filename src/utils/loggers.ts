import { NODE_ENV } from '../config/env'

export const info = (...params: [string]) => {
  if (NODE_ENV === 'development') {
    console.log(...params)
  }
}

export const error = (...params: [unknown]) => {
  if (NODE_ENV === 'development') {
    console.error(...params)
  }
}