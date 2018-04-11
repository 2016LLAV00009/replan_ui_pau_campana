'use strict'

const Notification = require('../models/notification')
const request = require('request');
const Project = require('../models/project')
const replan_api = require('../routes/replan_api')
const ProjectCtrl = require('../controllers/project')
var moment = require('moment')


function getNotificationsByProject (req, res) {
  let projectId =req.params.projectId;
  console.log("getNotificationsByProject")
  console.log(projectId);
  Notification.find({ id_project: projectId}, (err, notifications) => {
    if (err) return res.status(500).send({ message: `Error getting notifications ${err}`})
    return res.status(200).send(notifications)
  })
}

function getAllNotifications (req, res) {
  console.log("getAllNotifications")
  Notification.find({}, (err, notifications) => {
    if (err) return res.status(500).send({ message: `Error getting notifications ${err}`})
    return res.status(200).send(notifications)
  })
}

function getUserNotifications (req, res) {
  console.log("getUserNotifications")
  var my_projects;
  var notifications;
  Project.find({ owner: req.user}, (err, projects_owner) => {
    if (err) return res.status(500).send({ message: `Error getting notifications ${err}`})
    Project.find({ members: req.user}, (err, projects_members) => {
      if (err) return res.status(500).send({ message: `Error getting notifications ${err}`})
      my_projects = returned_array_ids(projects_owner, projects_members, req.user);
      console.log(my_projects);
      Notification.find({project: { $in: my_projects} }, (err, notifications) => {
        if (err) return res.status(500).send({ message: `Error getting notifications ${err}`})
        return res.status(200).send(notificationsWithTime(notifications))
      })
  })
  })

}



function returned_array_ids(arrayOwner, arrayMembers, userId) {

  var arr = [];
  var lenOwner = arrayOwner.length;
  var lenMembers = arrayMembers.length;
  for (var i = 0; i < lenOwner+lenMembers; i++) {
    var obj;
    if (i < lenOwner) obj = arrayOwner[i];
    else obj = arrayMembers[i-lenOwner];
      arr.push(obj.id_project);
  }
  return arr;
}


function notificationsWithTime(arrayNot) {
  var endDate = moment(Date.now())
  var arr = [];
  for (var y = 0; y < arrayNot.length; y++) {
    var i = arrayNot.length -(y +1);
      var startDate =moment(arrayNot[i].signupDate)
        arr.push({
          _id: arrayNot[i]._id,
          text: arrayNot[i].text,
          is_simple: arrayNot[i].is_simple,
          email: arrayNot[i].email,
          diffTime: endDate.diff(startDate, 'minutes'),
          user: arrayNot[i].user,
          project: arrayNot[i].project

    });
  }
  return arr;
}


module.exports = {
  getNotificationsByProject,
  getAllNotifications,
  getUserNotifications
}
