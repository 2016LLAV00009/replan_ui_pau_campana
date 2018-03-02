import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


import { replanAPIUserService} from '../../services/replanAPIUser.service';
import { AuthenticationService} from '../../services/AuthenticationService';


@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  model: any = {};
  loading = false;
  returnUrl: string;
  errorMessage : string;
  showError : boolean;
  showCorrect : boolean;

  constructor(private router: Router,
    private replanAPIUserService: replanAPIUserService) {
      this.showError = false;
      this.showCorrect = false;
    }

  ngOnInit() {
      this.showCorrect = false,
      this.showError = false;

  }

  send() {
    this.loading = true;
    this.replanAPIUserService.send_new_password(this.model.email)
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
}
