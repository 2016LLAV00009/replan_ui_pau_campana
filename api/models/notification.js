'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const NotificationSchema =  Schema({
  text: String,
  is_simple: Boolean,
  email: String,
  signupDate: {type: Date, default: Date.now()},
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  project: String,
})

module.exports = mongoose.model('Notification', NotificationSchema)
