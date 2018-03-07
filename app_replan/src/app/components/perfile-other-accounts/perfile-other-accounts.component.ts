import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { replanAPIUserService} from '../../services/replanAPIUser.service';
import { User } from '../../models/user';
import { AuthenticationService} from '../../services/AuthenticationService';

@Component({
  selector: 'app-perfile-other-accounts',
  templateUrl: './perfile-other-accounts.component.html',
  styleUrls: ['./perfile-other-accounts.component.css']
})
export class PerfileOtherAccountsComponent  implements OnInit {
  model: any = {};
  loading = false;
  errorMessage : string;
  showError : boolean;
  showCorrect: boolean;
  currentUser: User;

  constructor(
      private router: Router,
      private replanAPIUserService: replanAPIUserService,
      private authenticationService: AuthenticationService
   ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.model.trelloAccount = this.currentUser.trelloAccount;
    this.model.githubAccount = this.currentUser.githubAccount;
    }
  ngOnInit() {
      this.showError = false;
  }
  updateAccounts() {
    this.showError = false;
    this.showCorrect = false;
    this.loading = true;
      this.replanAPIUserService.updateUserOtherAccounts(this.model.trelloAccount, this.model.githubAccount)
      .subscribe( data => {
        this.loading = false;
        this.errorMessage = data.message;
        this.showCorrect = true;
        this.authenticationService.login_logic(data.user, data.token)

      },  error => {
        this.showError = true;
        this.errorMessage = "ERROR: " + error.message;
        this.loading = false;
      })    
  }
}

