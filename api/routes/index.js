'use strict'

const express = require('express')
const userCtrl = require('../controllers/user')
const ProjectCtrl = require('../controllers/project')
const NotificationCtrl = require('../controllers/notification')
const auth = require('../middlewares/auth')
const api = express.Router()

api.post('/auth/signup', userCtrl.signUp)
api.post('/auth/login', userCtrl.signIn)
api.post('/auth/confirmation', userCtrl.confirmation)
api.post('/auth/confirmation_again', userCtrl.valdiate_again)

//Descomentar si vols fer administrador des d'una crida.
//api.post('/user/setAdmin', auth, userCtrl.convertToAdmin)
api.post('/user/generate_password', userCtrl.generate_password)
api.put('/user/modify_password', auth, userCtrl.modify_password)
api.put('/user/update_account', auth, userCtrl.update_account)
api.get('/users', auth, userCtrl.getAllUsers)

api.put('/project/create', auth, ProjectCtrl.createProject)
api.get('/project/by_user', auth, ProjectCtrl.getProjectsByUser)
api.get('/project/search', auth, ProjectCtrl.searchProjects)
api.put('/project/member/add', auth, ProjectCtrl.addMember)
api.put('/project/member/remove', auth, ProjectCtrl.removeMember)
api.put('/project/answer_proposal', auth, ProjectCtrl.answerProposal)
api.get('/projects', auth, ProjectCtrl.getAllProjects)

api.get('/notification/project/:projectId/', auth, NotificationCtrl.getNotificationsByProject)
api.get('/notification/project/', NotificationCtrl.getAllNotifications)
api.get('/notification/user', auth, NotificationCtrl.getUserNotifications)




api.get('/private', auth, (req, res) => {
  res.status(200).send({ message: 'Tienes acceso'})
})

module.exports = api
