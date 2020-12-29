import crypto from 'crypto'

const iterations = 102046
const keylen = 64 
const digest = 'sha512'

function getPass(str, salt) {
  if (!str) return null
  if (!salt) {
    return crypto.createHash(digest).update(str).digest('base64')
  } else {
    return crypto.pbkdf2Sync(str, salt, iterations, keylen, digest).toString('base64')
  }
}

function genPass(str) {
  const result = { pass: null, salt: null }

  if (str) {
    result.salt = genSalt()
    result.pass = crypto.pbkdf2Sync(str, result.salt, iterations, keylen, digest).toString('base64')
  }

  return result
}

function genSalt(size) {
  if (!size || typeof size !== 'number') size = keylen
  return crypto.randomBytes(size).toString('base64')
}

const Crypto = {
  getPass,
  genPass,
  genSalt,
}
export default Crypto
// export {}
