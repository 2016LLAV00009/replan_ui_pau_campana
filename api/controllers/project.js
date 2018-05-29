'use strict'

const Notification = require('../models/notification')
const Project = require('../models/project')
const User = require('../models/user')
const request = require('request');

const replan_api = require('../routes/replan_api')

function createProject(req, res) {
  console.log("createProject");
  var b_is_private = req.body.is_private;
  var jsonDataObj = {
    'name': req.body.name,
    'description': req.body.description,
    'effort_unit': req.body.effort_unit,
    'hours_per_effort_unit': req.body.hours_per_effort_unit,
    'hours_per_week_and_full_time_resource': req.body.hours_per_week_and_full_time_resource,
    'is_private': req.body.is_private
  };
  request.post({
    headers: {
      'content-type': 'application/json'
    },
    url: replan_api.base_url,
    body: jsonDataObj,
    json: true
  }, (err, res_i, body) => {
    if (err) {
      return res.status(500).send({
        error: 'Error creating project'
      })
    }
    if (res_i.body.status) {
      return res.status(500).send({
        error: 'Error creating project, status: ' + res_i.body.status
      })
    }
    const project = new Project({
      id_project: res_i.body.id,
      owner: req.user,
      name: req.body.name,
      is_private: b_is_private
    })
    project.save((err, projectStored) => {
      if (err) return res.status(500).send({
        message: `Error while creating project${err}`
      })
      return res.status(200).send(project)
    })
  });
}

function getProjectsByUser(req, res) {
  console.log("getProjectsByUser")
  var my_projects;
  Project.find({
    owner: req.user
  }, (err, projects_owner) => {
    if (err) return res.status(500).send({
      message: `Error getting projects ${err}`
    })
    Project.find({
      members: req.user
    }, (err, projects_members) => {
      if (err) return res.status(500).send({
        message: `Error getting projects ${err}`
      })
      my_projects = returned_array(projects_owner, projects_members, req.user);
      return res.status(200).send(my_projects)
    })
  })
}



function searchProjects(req, res) {
  console.log("searchProjects")
  var name_query = req.query.name_query;
  var my_projects;
  Project.find({ $or: [ { id_project: name_query}, { name: name_query } ] }, (err, projects_byId) => {
    if (err) return res.status(500).send({
      message: `Error getting projects ${err}`
    })
    my_projects = returned_arraySearch(projects_byId, req.user);
    if (my_projects.length < 1) return res.status(500).send({
      message: `No projects found (your projects do not appear here)`
    })
    return res.status(200).send(my_projects)
  })
}



function addMember(req, res) {
  console.log("addMember")
  Project.find({
    id_project: req.body.id_project
  }, (err, projects) => {
    if (err) return res.status(500).send({
      message: `Error adding member ${err}`
    })
    //console.log(projects)
    if (!projects.length) return res.status(404).send({
      message: 'This project do not exists'
    })
    if (projects[0].owner == req.user) return res.status(404).send({
      message: 'This member is already part of this group'
    })
    if (contains(projects[0].members, req.user)) return res.status(404).send({
      message: 'This member is already part of this group'
    })
    if (contains(projects[0].unconfirmedMembers, req.user)) return res.status(404).send({
      message: 'This member is unconfirmed. You need the acceptation from a member of the group'
    })

    User.findById(req.user, (err, user) => {
      if (err) return res.status(500).send({
        message: `Error adding member ${err}`
      })
      //is private
      if (projects[0].is_private) {
        const notification = new Notification({
          text: user.displayName + " " + user.displaySurname + " would like to join project " + projects[0].name,
          email: user.email,
          is_simple: false,
          user: req.user,
          project: projects[0].id_project,
        })
        notification.save((err, notificationSaved) => {
          if (err) return res.status(500).send({
            message: `Error  adding member ${err}`
          })
        })
      }
      //is public
      else {
        const notification = new Notification({
          text: user.displayName + " " + user.displaySurname + " have joined the project " + projects[0].name,
          email: user.email,
          is_simple: true,
          user: req.user,
          project: projects[0].id_project,

        })
        notification.save((err, notificationSaved) => {
          if (err) return res.status(500).send({
            message: `Error  adding member ${err}`
          })
        })
      }
    })
    var m = "";
    if (projects[0].is_private) {
      projects[0].unconfirmedMembers.push(req.user);
      m = 'Request to join sent correctly';
    }
    else {
      projects[0].members.push(req.user);
      m = 'Member added correctly';
    }
    console.log(projects[0]);
    projects[0].save((err, projectStored) => {
      if (err) return res.status(500).send({
        message: `Error while adding member${err}`
      })

      return res.status(200).send({
        message: m
      })
    })
  })
}






function answerProposal(req, res) {
  console.log("answerProposal")
        Notification.findById(req.body.id_notification, (err, notif) => {
          User.findById(notif.user, (err, user) => {
            if (err) return res.status(500).send({
              message: `Error answering proposal${err}`
            })
          Project.find({id_project: notif.project}, (err, projects) => {
            console.log(projects[0].owner == req.user)
            if (err) return res.status(500).send({ message: `Error answering proposal ${err}`})
            if (!projects.length) return res.status(404).send({message: 'This project do not exists'})
            if (projects[0].owner == notif.user) return res.status(404).send({      message: 'This member is already part of this group'  })
            if (contains(projects[0].members, notif.user)) return res.status(404).send({        message: 'This member is already part of this group'})
            if (contains(projects[0].unconfirmedMembers, notif.user.toString())) {
            if (err) return res.status(500).send({ message: `Error answering proposal ${err}`})
            notif.is_simple = true;
            notif.signupDate = Date.now();
            if (req.body.is_acepted) notif.text = "Accepted: " +user.displayName + " " + user.displaySurname + " have been accepted as a member of " + projects[0].name + " project.";
            else if (!req.body.is_acepted) notif.text =  "Rejected: " +user.displayName + " " + user.displaySurname + " have not been accepted as a member of " + projects[0].name + " project.";
            if (req.body.is_acepted && projects[0].members.indexOf(notif.user) == -1) {
              projects[0].members.push(notif.user);
              remove(projects[0].unconfirmedMembers, notif.user);
            }
            else if (!req.body.is_acepted && projects[0].members.indexOf(notif.user) == -1) {
              remove(projects[0].unconfirmedMembers, notif.user);
            }
            projects[0].save((err, projectStored) => {
              if (err) return res.status(500).send({
                message: `Error while adding member${err}`
              })

              console.log("@@@@@@@@@@@@@@@@@@@")
              console.log("@@@@@@@@@@@@@@@@@@@")
              console.log("@@@@@@@@@@@@@@@@@@@3")
              console.log(notif);
          })
        }
          notif.save((err, notificationSaved) => {
            if (err) return res.status(500).send({
              message: `Error answering proposal${err}`
            })
            return res.status(200).send({ message: 'Proposal answered correctly' })
          })
        })

        })
  })
}






function removeMember(req, res) {
  console.log("removeMember")

  Project.find({
    id_project: req.body.id_project
  }, (err, projects) => {
    if (err) return res.status(500).send({
      message: `Error removing member ${err}`
    })
    if (!projects.length) return res.status(404).send({
      message: 'This project do not exists'
    })
    if (projects[0].owner == req.user) return res.status(404).send({
      message: 'This member can not be removed. He is the owner'
    })
    if (!remove(projects[0].members, req.user)) return res.status(404).send({
      message: 'This member is not a member of this group'
    })
    projects[0].save((err, projectStored) => {
      if (err) return res.status(500).send({
        message: `Error while removeing member${err}`
      })
      return res.status(200).send({
        message: 'Member removed correctly'
      })
    })
  })
}





function returned_array(arrayOwner, arrayMembers, userId) {

  var arr = [];
  var lenOwner = arrayOwner.length;
  var lenMembers = arrayMembers.length;
  for (var i = 0; i < lenOwner + lenMembers; i++) {
    var obj;
    if (i < lenOwner) obj = arrayOwner[i];
    else obj = arrayMembers[i - lenOwner];
    arr.push({
      owner: (obj.owner == userId),
      members: obj.members.length + 1,
      id: obj.id_project,
      name: obj.name,
      is_private: obj.is_private
    });
  }
  return arr;
}

function returned_arraySearch(arrayId, userId) {

  var arr = [];
  var lenId = arrayId.length;
  for (var i = 0; i < lenId; i++) {
    var obj = arrayId[i];
    if (userId != obj.owner && obj.members.indexOf(userId) == -1) {
      arr.push({
        owner: (obj.owner == userId),
        members: obj.members.length + 1,
        id: obj.id_project,
        name: obj.name,
        is_private: obj.is_private
      });
    }
  }
  return arr;
}


function remove(array, element) {
  const index = array.indexOf(element);
  var removed = false;
  if (index !== -1) {
    array.splice(index, 1);
    removed = true;
  }
  return removed;
}

function contains(a, obj) {
  return a.some(function(element) {
    return element == obj;
  })
}





module.exports = {
  createProject,
  getProjectsByUser,
  answerProposal,
  addMember,
  removeMember,
  searchProjects
}
