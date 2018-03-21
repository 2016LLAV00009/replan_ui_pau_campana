'use strict'

const Project = require('../models/project')
const request = require('request');

const replan_api = require('../routes/replan_api')

function createProject(req, res) {
  console.log("createProject");
  console.log(req.body.is_private)
  var b_is_private = req.body.is_private;
  var jsonDataObj = {
    'name': req.body.name,
    'description': req.body.description,
    'effort_unit': req.body.effort_unit,
    'hours_per_effort_unit': req.body.hours_per_effort_unit,
    'hours_per_week_and_full_time_resource': req.body.hours_per_week_and_full_time_resource,
    'is_private' : req.body.is_private
  };
  request.post({headers: {'content-type': 'application/json'},
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

function getProjectsByUser (req, res) {
  console.log("getProjectsByUser")
  var my_projects;
  Project.find({ owner: req.user}, (err, projects_owner) => {
    if (err) return res.status(500).send({ message: `Error getting projects ${err}`})
    Project.find({ members: req.user}, (err, projects_members) => {
      if (err) return res.status(500).send({ message: `Error getting projects ${err}`})
      my_projects = returned_array(projects_owner, projects_members);
    return res.status(200).send(my_projects)
  })
  })
}


function searchProjects (req, res) {
  console.log("searchProjects")
  var name_query = req.query.name_query;
  var my_projects;
  Project.find({ id_project: name_query}, (err, projects_byId) => {
    if (err) return res.status(500).send({ message: `Error getting projects ${err}`})
    my_projects = returned_array(projects_byId, []);
    if (my_projects.length < 1) return res.status(500).send({ message: `No projects found`})
    return res.status(200).send(my_projects)
  })
}



function addMember (req, res) {
  console.log("addMember")
  console.log(req.body)

  Project.find({ id_project: req.body.id_project}, (err, projects) => {
    if (err) return res.status(500).send({ message: `Error adding member ${err}`})
    //console.log(projects)
    if (!projects.length) return res.status(404).send({ message: 'This project do not exists' })
    if (projects[0].owner == req.user) return res.status(404).send({ message: 'This member is already part of this group' })
    if (contains(projects[0].members, req.user)) return res.status(404).send({ message: 'This member is already part of this group' })
    projects[0].members.push(req.user);
    projects[0].save((err, projectStored) => {
      if (err) return res.status(500).send({
        message: `Error while adding member${err}`
      })
      return res.status(200).send({ message: 'Member added correctly' })
    })
  })
}


function removeMember (req, res) {
  console.log("removeMember")

  Project.find({ _id: req.body.id_project}, (err, projects) => {
    if (err) return res.status(500).send({ message: `Error removeing member ${err}`})
    if (!projects.length) return res.status(404).send({ message: 'This project do not exists' })
    if (projects[0].owner == req.user) return res.status(404).send({ message: 'This member can not be removed. He is the owner' })
    if (!remove(projects[0].members, req.user)) return res.status(404).send({ message: 'This member is not a member of this group' })
    projects[0].save((err, projectStored) => {
      if (err) return res.status(500).send({
        message: `Error while removeing member${err}`
      })
      return res.status(200).send({ message: 'Member removed correctly' })
    })
  })
}





function returned_array(arrayOwner, arrayMembers) {

  var arr = [];
  var lenOwner = arrayOwner.length;
  var lenMembers = arrayMembers.length;
  for (var i = 0; i < lenOwner+lenMembers; i++) {
    var obj;
    if (i < lenOwner) obj = arrayOwner[i];
    else obj = arrayMembers[i-lenOwner];
      arr.push({
          owner: (i < lenOwner),
          members: obj.members.length +1,
          id: obj.id_project,
          name: obj.name,
          is_private: obj.is_private
      });
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
    return a.some(function(element){return element == obj;})
}





module.exports = {
  createProject,
  getProjectsByUser,
  addMember,
  removeMember,
  searchProjects
}
