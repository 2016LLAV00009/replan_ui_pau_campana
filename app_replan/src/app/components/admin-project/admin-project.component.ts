import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { replanAPIUserService} from '../../services/replanAPIUser.service';
import { User } from '../../models/user';
import { AuthenticationService} from '../../services/AuthenticationService';


declare var $: any;
@Component({
  selector: 'app-admin-project',
  templateUrl: './admin-project.component.html',
  styleUrls: ['./admin-project.component.css']
})
export class AdminProjectComponent implements OnInit {

  infoReceived: any;
  infoReceivedEmail: any;
  infoShowed;
  infoReceivedName: any;
  total: any;
  currentUser: User;
  errorMessage : string;
  showError : boolean;
  loading: boolean;
  allUsers: any;
  constructor(
    private router: Router,
    private replanAPIUserService: replanAPIUserService,
    private authenticationService: AuthenticationService
 ) {
  this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.showError = false;
    this.loading = true;
    this.replanAPIUserService.getAllUsers()
    .subscribe( data => {
      this.allUsers = data.all_users;
      this.replanAPIUserService.getAllProjects()
      .subscribe( data => {
        this.loading = false;
        this.errorMessage = data.message;
        this.infoReceived = data.all_projects;
        this.infoReceivedEmail = this.clone(data.all_projects);
        this.infoReceivedName = this.clone(data.all_projects);
        this.seeInformation();

      },  error => {
        this.showError = true;
        this.errorMessage = "ERROR: " + error.message;
        this.loading = false;
      }) 

    },  error => {
      this.showError = true;
      this.errorMessage = "ERROR: " + error.message;
      this.loading = false;
    })       
  }

  clone(obj) {
    // Handle the 3 simple types, and null or undefined
    if (null == obj || "object" != typeof obj) return obj;

    // Handle Date
    if (obj instanceof Date) {
        var copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
        var copy1 = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            copy1[i] = this.clone(obj[i]);
        }
        return copy1;
    }

    // Handle Object
    if (obj instanceof Object) {
        var copy2 = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy2[attr] = this.clone(obj[attr]);
        }
        return copy2;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
}



updateList(filter_type) {
  var filter = filter_type;
  if (filter_type == "email") {
    document.getElementById("button_email").classList.remove('button_border');
    document.getElementById("button_email").classList.add('button_border_pressed');
    document.getElementById("button_name").classList.remove('button_border_pressed');
    document.getElementById("button_name").classList.add('button_border');
    this.infoShowed =  this.infoReceivedEmail;
  }
  else if (filter_type == "name") {
    document.getElementById("button_name").classList.remove('button_border');
    document.getElementById("button_name").classList.add('button_border_pressed');
    document.getElementById("button_email").classList.remove('button_border_pressed');
    document.getElementById("button_email").classList.add('button_border');
    this.infoShowed =  this.infoReceivedName;
  }
  
}






seeInformation() {

  var all_u = this.allUsers;
  var all_p = this.infoReceived;
  this.total = all_p.length;
  for (var i = 0; i < all_u.length; ++i) {
    for (var j = 0; j < all_p.length; ++j) {
      if (all_p[j].owner == all_u[i]._id) {
        this.infoReceivedEmail[j].owner = all_u[i].email;
        this.infoReceivedName[j].owner = all_u[i].displayName +" " + all_u[i].displaySurname;
      }

      for (var k = 0; k < all_p[j].members.length; ++k) {
        if (all_p[j].members[k] == all_u[i]._id) {
          this.infoReceivedEmail[j].members[k] = all_u[i].email;
          this.infoReceivedName[j].members[k] = all_u[i].displayName +" " + all_u[i].displaySurname;
        }
      }
      for (var k = 0; k < all_p[j].unconfirmedMembers.length; ++k) {
        if (all_p[j].unconfirmedMembers[k] == all_u[i]._id) {
          this.infoReceivedEmail[j].unconfirmedMembers[k] = all_u[i].email;
          this.infoReceivedName[j].unconfirmedMembers[k] = all_u[i].displayName +" " + all_u[i].displaySurname;
        }
      }
    }

  }

  this.infoShowed =  this.infoReceivedName;
}
}
