'use strict'

const mongoose = require('mongoose')
const User = require('../models/user')
const service = require('../services')
const mailService = require('../services/mail')
const bcrypt = require('bcrypt-nodejs')
var generator = require('generate-password');

function signUp (req, res) {
  console.log("signUp")
  const user = new User ({
    email: req.body.email,
    displayName:  req.body.displayName,
    displaySurname: req.body.displaySurname,
    password: req.body.password
  })

  user.save((err) => {

    if (err) {
      console.log( `Error: ${err}`)
      return res.status(500).send({ message: 'Email already registered'})
    }

    let token = service.createToken(user);
    sendMailConfirmation(token, user);
    return res.status(200).send({ message: 'We have sent you an email.  Please, confirm your account'})
  })
}


function confirmation (req, res) {
  console.log("confirmation")
  console.log(req.body.token)
  service.decodeToken(req.body.token)
  .then(decode => {
    let update = {confirmed: true}
    User.findByIdAndUpdate(decode, update, (err, userUpdated) => {
      if (err) return res.status(500).send({message: `Error while validating account${err}`})
      return res.status(200).send({ message: 'Your account has been validated, you can now log in and us Replan'})
    })
 })
 .catch(err => {
   console.log(err)
   return res.status(404).send({ message: 'An error occurred while validating your account (incorrect parameters in url)' })
   // handle errors
 })

}

function valdiate_again (req, res) {
  console.log("valdiate_again")
  User.find({ email: req.body.email}, (err, user) => {
    if (err) return res.status(500).send({ message: `Error validating account ${err}`})
    if (!user.length) return res.status(404).send({ message: 'This email is not registered. Please, register' })
    req.user = user[0]
    if (user[0].confirmed) return res.status(404).send({ message: 'This user has already been validated' })
    let token = service.createToken(user[0]);
    sendMailConfirmation(token, user[0]);
    return res.status(200).send({ message: 'We have sent you an email.  Please, confirm your account'})


  })
}







function generate_password (req, res) {
  console.log("generate_password")
  User.find({ email: req.body.email}, (err, user) => {
    if (err) return res.status(500).send({ message: `Error validating account ${err}`})
    if (!user.length) return res.status(404).send({ message: 'This email is not registered. Please, register' })
    req.user = user[0]
    if (!user[0].confirmed)  return res.status(404).send({ message: 'Please, confirm your account to set a new password' })
    else {
      var password = generator.generate({
          length: 10,
          numbers: true
      });
      service.getPasswordBcrypt(password)
      .then(response => {
        let pw = {password: response.pwBcrype}
        User.findByIdAndUpdate(user[0]._id, pw, (err, userUpdated) => {
          if (err) res.status(500).send({message: `Error setting new password${err}`})
          sendMailPassword(password, userUpdated)
          return res.status(200).send({ message: 'We have sent you an email. There you will see your new password'})
        })
      })
      .catch(response => {
          return res.status(500).send({ message: `Error setting new password  ${response}`})
      })
    }
  })
}








function modify_password (req, res) {
  console.log("modify_password");
    console.log(req.user);
  User.findById(req.user, (err, user) => {
    if (err) return res.status(500).send({ message: `Error while modifying password ${err}`})
    if (!user) return res.status(404).send({ message: 'Error while modifying password' })
    bcrypt.compare(req.body.old_password, user.password, function(err, resp) {
      if (err) return res.status(500).send({ message: `Error while modifying password ${err}`})
      if (!resp) return res.status(404).send({ message: 'The old password is wrong' })
      else {
        service.getPasswordBcrypt(req.body.new_password)
        .then(response => {
          let pw = {password: response.pwBcrype}
          User.findByIdAndUpdate(req.user, pw, (err, userUpdated) => {
            if (err) return res.status(500).send({message: `Error setting new password${err}`})
            return res.status(200).send({ message: 'Password modified correctly'})
          })

        })
        .catch(response => {
            return res.status(500).send({ message: `Error while modifying password ${err}`})
        })
      }
    });
  })
}







function update_account (req, res) {
  console.log("update_account");
    console.log(req.body);
  User.findById(req.user, (err, user) => {
    if (err) return res.status(500).send({ message: `Error while updating infromation ${err}`})
    if (!user) return res.status(404).send({ message: 'Error while updating infromation ' })
    User.findByIdAndUpdate(req.user, req.body, {new: true}, (err, userUpdated) => {
      if (err) return res.status(500).send({message: `Error updating information${err}`})
      user.password = undefined;
      console.log(userUpdated);
      let muser = userUpdated.toObject(); // swap for a plain javascript object instance
      delete muser["_id"];
      return res.status(200).send({
        message: 'Information updated correctly',
        user: muser,
        token: service.createToken(userUpdated)
      })
    })
  })
}










function signIn (req, res) {
  console.log("signIn")
    console.log(req.body)
    User.find({ email: req.body.email}, (err, user) => {
      if (err) return res.status(500).send({ message: `Error while singing in ${err}`})
      if (!user.length) return res.status(404).send({ message: 'This email is not registered' })
      req.user = user[0]
      console.log(req.body.password)
      console.log(user[0].password)
      bcrypt.compare(req.body.password, user[0].password, function(err, resp) {
        if (err) return res.status(500).send({ message: `Error while signing in ${err}`})
        if (!resp) return res.status(404).send({ message: 'The password is wrong' })
        else {
          if (!user[0].confirmed) return res.status(404).send({ message: 'Please, confirm your email to log in' })

          user[0].password = undefined;

          let muser = user[0].toObject(); // swap for a plain javascript object instance
          delete muser["_id"];
          return res.status(200).send({
            message: 'You have logged in correctly',
            user: muser,
            token: service.createToken(user[0])
          })
        }
      });
    })
}

function sendMailConfirmation (token, user) {
  console.log(user)
  console.log(user.displayName)
  let from = 'replan.system@gmail.com'
  let to = 'pau.campanya.soler@gmail.com'
  let subject = 'Replan validating account'
  let html = `<h1>Welcome to Replan ${user.displayName} </h1>
  <p>Please, confirm your account by clicking the following link: </p>
  <p><a href="http://localhost:4200/confirmation/${token}">Validate your account!</a></p>
  <p>Thank you. </p>`
  mailService.sendEmail(from, to, subject, html)
}

function sendMailPassword (password, user) {
  console.log(user)
  console.log(user.displayName)
  let from = 'replan.system@gmail.com'
  let to = 'pau.campanya.soler@gmail.com'
  let subject = 'Replan validating account'
  let html = `<h1>New password (Replan) </h1>
  <p>Hello ${user.displayName} , we have generated for you a new password: </p>
  <p>new password: ${password}</p>
  <p>Thank you. </p>`
  mailService.sendEmail(from, to, subject, html)
}


module.exports = {
  signUp,
  confirmation,
  valdiate_again,
  generate_password,
  modify_password,
  update_account,
  signIn
}
