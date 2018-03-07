import { Component, OnInit } from '@angular/core';
import { GlobalDataService } from '../../../services/globaldata.service';
import { replanAPIService } from '../../../services/replanAPI.service';
import { Router } from '@angular/router';
import { AuthenticationService} from '../../../services/AuthenticationService';

@Component({
  selector: 'app-navbar-logged-in',
  templateUrl: './navbar-logged-in.component.html',
  styleUrls: ['./navbar-logged-in.component.css']

})
export class NavbarLoggedInComponent implements OnInit {

  currentIdProject: number = null;

  constructor(private globaldata: GlobalDataService,
              private _replanAPIService: replanAPIService,
              private router: Router, 
              private authenticationService: AuthenticationService) { }

  ngOnInit() {
  }

  goToHome() {
   this.router.navigate( ['/home/'] );
  }

  goToProfile() {
    this.router.navigate( ['/profile/'] );
  }

  goToReplan() {
    this.router.navigate( [''] );
  }

  logOut() {
    this.authenticationService.logout()
    this.router.navigate( ['/login/'] );
  }

}
