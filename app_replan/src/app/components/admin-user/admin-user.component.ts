import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { replanAPIUserService} from '../../services/replanAPIUser.service';
import { User } from '../../models/user';
import { AuthenticationService} from '../../services/AuthenticationService';


declare var $: any;

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.css']
})
export class AdminUserComponent implements OnInit {

  infoReceived: any;
  currentUser: User;
  errorMessage : string;
  showError : boolean;
  loading: boolean;
  total: any;

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
        this.loading = false;
        this.errorMessage = data.message;
        this.infoReceived = data.all_users;
        this.total = this.infoReceived.length;
      },  error => {
        this.showError = true;
        this.errorMessage = "ERROR: " + error.message;
        this.loading = false;
      })    
  }

}
