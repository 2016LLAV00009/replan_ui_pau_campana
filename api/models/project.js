'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProjectSchema =  Schema({
  id_project: { type: String, unique: true},
  name: String,
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  unconfirmedMembers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  is_private: Boolean
})

module.exports = mongoose.model('Project', ProjectSchema)
