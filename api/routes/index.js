'use strict'

const express = require('express')
const userCtrl = require('../controllers/user')
const ProductCtrl = require('../controllers/product')
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

api.get('/private', auth, (req, res) => {
  res.status(200).send({ message: 'Tienes acceso'})
})

module.exports = api
