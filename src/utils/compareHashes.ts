import { compare } from 'bcrypt'


// Compare the hashes
export const compareHashes = async (password: string, hash: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    compare(password, hash, (err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }
    })
  })
}