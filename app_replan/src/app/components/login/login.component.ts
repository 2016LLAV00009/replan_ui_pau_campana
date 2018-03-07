import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { replanAPIUserService} from '../../services/replanAPIUser.service';
import { AuthenticationService} from '../../services/AuthenticationService';

declare var $: any;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})



export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;
  returnUrl: string;
  errorMessage : string;
  showError : boolean;

  constructor(
      private router: Router,
      private replanAPIUserService: replanAPIUserService,
      private authenticationService: AuthenticationService
   ) { }

  ngOnInit() {
      // reset login status
      this.authenticationService.logout();
      this.showError = false;

      // get return url from route parameters or default to '/'
  }

  login() {
    if (!validateEmail(this.model.email)) {
      this.errorMessage = "Wrong email"
       this.showError = true;
    }
    else {
      this.loading = true;
      this.replanAPIUserService.login(this.model.email, this.model.password)
      .subscribe( data => {
        console.log(data)
        this.authenticationService.login_logic(data.user, data.token)
        this.router.navigate( ['/home'] );

      },  error => {
        console.log(error)
        this.showError = true;
        this.errorMessage = "ERROR: " + error.message;
        this.loading = false;
      })
    }    
  }
}


function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}




