import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


import { replanAPIUserService} from '../../services/replanAPIUser.service';
import { AuthenticationService} from '../../services/AuthenticationService';

@Component({
  selector: 'app-send-validation-again',
  templateUrl: './send-validation-again.component.html',
  styleUrls: ['./send-validation-again.component.css']
})
export class SendValidationAgainComponent implements OnInit {
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

  validate() {
    this.loading = true;
    this.replanAPIUserService.send_validation_again(this.model.email)
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
