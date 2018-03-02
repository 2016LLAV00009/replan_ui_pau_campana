import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


import { replanAPIUserService} from '../../services/replanAPIUser.service';
import { AuthenticationService} from '../../services/AuthenticationService';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: any = {};
  loading = false;
  loading2 = false;
  returnUrl: string;
  errorMessage : string;
  errorMessage2 : string;
  showError : boolean;
  showCorrect : boolean;
  showError2 : boolean;
  showCorrect2 : boolean;
  constructor(private router: Router,
    private replanAPIUserService: replanAPIUserService) {
      this.showError = false;
      this.showCorrect = false;
      this.showError2 = false;
      this.showCorrect2 = false;
      
    }

  ngOnInit() {
  }

  register() {
    this.showCorrect = false;
    this.showError = false;
    if (!validateEmail(this.model.email)) {
      this.errorMessage = "Wrong email"
       this.showError = true;
    }
    else {
      this.loading = true;
      this.replanAPIUserService.register(this.model)
      .subscribe( data => {
        console.log(data)
        this.showCorrect = true;
        this.errorMessage = data.message;
        this.loading = false;
      },  error => {
        console.log(error)
        this.showError = true;
        this.errorMessage = "ERROR: " + error.message;
        this.loading = false;
      })
    }

            

  }

  resend() {
    console.log(this.model.email)
    this.showCorrect2 = false;
    this.showError2 = false;
    this.replanAPIUserService.send_validation_again(this.model.email)
    .subscribe( data => {
      this.showCorrect2 = true;
      this.errorMessage2 = data.message;
      this.loading2 = false;
    },  error => {
      this.showError2 = true;
      this.errorMessage2 = "ERROR: " + error.message;
      this.loading2 = false;
    })

  }

}


function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}