import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { AppConstants } from '../app.constants';
import { Observable } from 'rxjs';
import 'rxjs/Rx';
 
@Injectable()
export class AuthenticationService {

    projectsURL: string = AppConstants.urlAPIUser;

    constructor(private http: Http ) { }
    
    login_logic(user, token) {
      localStorage.setItem('currentUser', JSON.stringify(user)); 
      localStorage.setItem('token', JSON.stringify(token)); 
    }


 
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        localStorage.removeItem('token');
    }
}