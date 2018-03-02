'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const crypto = require('crypto')
const services = require('../services')

const UserSchema = new Schema({
  email: { type: String, unique: true, lowercase: true},
  displayName: String,
  displaySurname: String,
  avatar: String,
  password: String,
  signupDate: {type: Date, default: Date.now()},
  lastLogin: Date,
  confirmed: {type: Boolean, default: false}
})

UserSchema.pre('save', function(next) {
  let user = this
  let pw = user.password
  if (!user.isModified('password')) return next()
  services.getPasswordBcrypt(pw)
  .then(response => {
    user.password = response.pwBcrype
    next()
  })
  .catch(response => {
      res.status(response.status)
  })
} )


UserSchema.methods.gravatar = function() {
  if(!this.email) return 'https://gravatar.com/avatar/?s=200&d=retro'

  const md5 = crypto.createHash('md5').update(this.email).digest('hex')
  return `https://gravatar.com/avatar/${md5}?s=200&d=retro`
}

module.exports = mongoose.model('User', UserSchema)
