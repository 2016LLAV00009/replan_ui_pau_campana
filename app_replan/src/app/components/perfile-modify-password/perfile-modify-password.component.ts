import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { replanAPIUserService} from '../../services/replanAPIUser.service';

@Component({
  selector: 'app-perfile-modify-password',
  templateUrl: './perfile-modify-password.component.html',
  styleUrls: ['./perfile-modify-password.component.css']
})
export class PerfileModifyPasswordComponent implements OnInit {
  model: any = {};
  loading = false;
  errorMessage : string;
  showError : boolean;
  showCorrect: boolean;

  constructor(
      private router: Router,
      private replanAPIUserService: replanAPIUserService
   ) { }
  ngOnInit() {
      this.showError = false;
  }
  modifyPassword() {
    this.showError = false;
    this.showCorrect = false;
    if (!samePasswords(this.model.newPassword1, this.model.newPassword2)) {
      this.errorMessage = "Passwords do not match"
       this.showError = true;
    }
    else {
      this.loading = true;
      this.replanAPIUserService.modifyPassword(this.model.actualPassword, this.model.newPassword1)
      .subscribe( data => {
        this.errorMessage = data.message;
        this.showCorrect = true;

      },  error => {
        this.showError = true;
        this.errorMessage = "ERROR: " + error.message;
        this.loading = false;
      })
    }    
  }
}

function samePasswords(newPassword1, newPassword2) {
  return newPassword1 == newPassword2;
}

