'use strict'

const services = require('../services')


function isAuth (req, res, next) {
  if (!req.headers.authorization) {
    return res.status(403).send({ message: 'You do not have authorization'})
  }

  const token = req.headers.authorization.split(" ")[1]
  services.decodeToken(token)
  .then(response => {
    console.log(response)
    req.user = response
    next()
  })
  .catch(response => {
    return res.status(403).send({ message: 'You do not have authorization: ' +  response.message})
  })
}

module.exports = isAuth
