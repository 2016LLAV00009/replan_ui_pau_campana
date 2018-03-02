'use strict'

const jwt = require('jwt-simple')
const moment = require('moment')
const config = require('../config')
const bcrypt = require('bcrypt-nodejs')

function createToken (user) {
  const payload = {
    sub: user._id,
    iat: moment().unix(),
    exp: moment().add(14, 'days').unix(),
  }
  return jwt.encode(payload, config.SECRET_TOKEN )
}

function decodeToken (token) {
  const decoded = new Promise((resolve, reject) => {
    try {
      const payload =jwt.decode(token, config.SECRET_TOKEN)
        console.log(payload)
      if (payload.exp <= moment().unix()) {
        reject({
          status: 401,
          message: 'El token ha expirado'
        })
      }
      resolve(payload.sub)

    } catch (err) {
      reject({
        status:500,
        message: 'Invalid token'
      })
    }
  })

  return decoded
}


function getPasswordBcrypt(pw) {
    let pwBcrype = pw
    // Return new promise
    return new Promise(function(resolve, reject) {
      bcrypt.genSalt(10, (err, salt) => {
        if (err) reject(err);
        bcrypt.hash(pwBcrype, salt, null, (err, hash) => {
          if (err) reject(err);
          pwBcrype = hash
          resolve({pwBcrype: pwBcrype});
        })
      })
    })

}


module.exports = {
  createToken,
  decodeToken,
  getPasswordBcrypt
}
