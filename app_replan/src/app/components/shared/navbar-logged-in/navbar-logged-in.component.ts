import { Component, OnInit } from '@angular/core';
import { GlobalDataService } from '../../../services/globaldata.service';
import { replanAPIService } from '../../../services/replanAPI.service';
import { Router } from '@angular/router';
import { User } from '../../../models/user';
import { AuthenticationService} from '../../../services/AuthenticationService';

@Component({
  selector: 'app-navbar-logged-in',
  templateUrl: './navbar-logged-in.component.html',
  styleUrls: ['./navbar-logged-in.component.css']

})
export class NavbarLoggedInComponent implements OnInit {

  currentUser: User;
  currentIdProject: number = null;

  constructor(private globaldata: GlobalDataService,
              private _replanAPIService: replanAPIService,
              private router: Router, 
              private authenticationService: AuthenticationService) {
                this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
               }

  ngOnInit() {
  }

  goToHome() {
   this.router.navigate( [''] );
  }

  goToAdmin() {
    this.router.navigate( ['/admin/user'] );
  }
  goToProfile() {
    this.router.navigate( ['/profile/'] );
  }


  logOut() {
    this.authenticationService.logout()
    this.router.navigate( ['/login/'] );
  }

}
