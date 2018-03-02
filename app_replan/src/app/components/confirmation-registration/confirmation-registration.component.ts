import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { replanAPIUserService} from '../../services/replanAPIUser.service';
import { AuthenticationService} from '../../services/AuthenticationService';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-confirmation-registration',
  templateUrl: './confirmation-registration.component.html',
  styleUrls: ['./confirmation-registration.component.css']
})
export class ConfirmationRegistrationComponent implements OnInit {
  model: any = {};
  loading = true;
  returnUrl: string;
  errorMessage : string;
  showError : boolean;
  showCorrect : boolean;
  validEmail : boolean;
  constructor( private router: Router,
    private replanAPIUserService: replanAPIUserService,
    private activatedRoute: ActivatedRoute) {
      this.showError = false;
      this.showCorrect = false;
     }

  ngOnInit() {
    this.activatedRoute.params.subscribe( params => {
      if (params['token'] ==  undefined) {
        this.showError = true;
        this.errorMessage = "ERROR: An error occurred while validating your account (incorrect parameters in url)";
        this.loading = false;
      }
      else {
        this.replanAPIUserService.confirmation(params['token'])
        .subscribe( data => {
          this.loading = false;
          this.showCorrect = true;
          this.errorMessage = data.message;
        },  error => {
          this.showError = true;
          this.errorMessage = "ERROR: " + error.message;
          this.loading = false;
        })
      }
     
     
  });
    
  
  }

  login() {
    this.router.navigate( ['/login'] );
  }

  validate() {
    this.router.navigate( ['/send_validation'] );
  }
}

function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
