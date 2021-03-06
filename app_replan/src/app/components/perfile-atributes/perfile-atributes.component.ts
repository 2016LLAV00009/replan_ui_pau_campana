import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { replanAPIUserService} from '../../services/replanAPIUser.service';
import { User } from '../../models/user';
import { AuthenticationService} from '../../services/AuthenticationService';


@Component({
  selector: 'app-perfile-atributes',
  templateUrl: './perfile-atributes.component.html',
  styleUrls: ['./perfile-atributes.component.css']
})
export class PerfileAtributesComponent  implements OnInit {
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
    this.model.nameDisplay = this.currentUser.displayName;
    this.model.surnameDisplay = this.currentUser.displaySurname;
    }
  ngOnInit() {
      this.showError = false;
  }
  updateInformation() {
    this.showError = false;
    this.showCorrect = false;
    this.loading = true;
      this.replanAPIUserService.updateUserInformation(this.model.nameDisplay, this.model.surnameDisplay)
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



