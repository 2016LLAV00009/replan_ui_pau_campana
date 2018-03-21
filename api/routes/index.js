'use strict'

const express = require('express')
const userCtrl = require('../controllers/user')
const ProductCtrl = require('../controllers/product')
const ProjectCtrl = require('../controllers/project')
const auth = require('../middlewares/auth')
const api = express.Router()

api.get('/product', ProductCtrl.getProducts)
api.get('/product/:productId', ProductCtrl.getProduct)
api.post('/product', ProductCtrl.saveProduct)
api.put('/product/:productId', ProductCtrl.updateProduct)
api.delete('/product/:productId', ProductCtrl.deleteProduct)
api.post('/signup', userCtrl.signUp)
api.post('/login', userCtrl.signIn)
api.post('/confirmation', userCtrl.confirmation)
api.post('/valdiate_again', userCtrl.valdiate_again)
api.post('/generate_password', userCtrl.generate_password)
api.put('/modify_password', auth, userCtrl.modify_password)
api.put('/update_account', auth, userCtrl.update_account)
api.put('/project', auth, ProjectCtrl.createProject)
api.get('/project', auth, ProjectCtrl.getProjectsByUser)
api.put('/project/addMember', auth, ProjectCtrl.addMember)
api.put('/project/removeMember', auth, ProjectCtrl.removeMember)
api.get('/project/search', auth, ProjectCtrl.searchProjects)

api.get('/private', auth, (req, res) => {
  res.status(200).send({ message: 'Tienes acceso'})
})

module.exports = api
