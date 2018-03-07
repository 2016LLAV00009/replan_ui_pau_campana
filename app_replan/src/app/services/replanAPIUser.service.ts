import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { AppConstants } from '../app.constants';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { User } from '../models/user';

@Injectable()
export class replanAPIUserService {

  projectsURL: string = AppConstants.urlAPIUser;

  constructor(private http: Http) { }

  login(username: string, password: string) {
    const url = this.projectsURL + AppConstants.loginURL;
    const body = { email: username, password: password };
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http.post(url, body, { headers })
      .map(res => {
        return res.json();
      })
      .catch((error: Response) => {
        return Observable.throw(error.json());
      })
  }

  register(user: User) {
    const url = this.projectsURL + AppConstants.registerURL;
    console.log(user)
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http.post(url, user, { headers })
      .map(res => {
        return res.json();
      })
      .catch((error: Response) => {
        return Observable.throw(error.json());
      })
  }

  confirmation(token: string) {
    const url = this.projectsURL + AppConstants.confirmationURL;
    const body = { token: token };
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http.post(url, body, { headers })
      .map(res => {
        return res.json();
      })
      .catch((error: Response) => {
        return Observable.throw(error.json());
      })
  }

  send_validation_again(email: string) {
    const url = this.projectsURL + AppConstants.validateAgainURL;
    const body = { email: email };
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http.post(url, body, { headers })
      .map(res => {
        return res.json();
      })
      .catch((error: Response) => {
        return Observable.throw(error.json());
      })
  }

  send_new_password(email: string) {
    const url = this.projectsURL + AppConstants.generate_passwordURL;
    const body = { email: email };
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http.post(url, body, { headers })
      .map(res => {
        return res.json();
      })
      .catch((error: Response) => {
        return Observable.throw(error.json());
      })
  }

  modifyPassword(oldP: string, newP: string) {
    const url = this.projectsURL + AppConstants.modify_passwordURL;
    let token = this.getToken();
    if (token) {
      const body = { old_password: oldP, new_password: newP };
      const headers = new Headers({
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`

      });
      return this.http.put(url, body, { headers })
        .map(res => {
          return res.json();
        })
        .catch((error: Response) => {
          return Observable.throw(error.json());
        })
    }
  }


  updateUserInformation(name: string, surname: string) {
    const url = this.projectsURL + AppConstants.update_accountURL;
    let token = this.getToken();
    if (token) {
      const body = { displayName: name, displaySurname: surname };
      const headers = new Headers({
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`
      });
      return this.http.put(url, body, { headers })
        .map(res => {
          return res.json();
        })
        .catch((error: Response) => {
          return Observable.throw(error.json());
        })
    }
  }


  updateUserOtherAccounts(trelloAccount: string, githubAccount: string) {
    const url = this.projectsURL + AppConstants.update_accountURL;
    let token = this.getToken();
    if (token) {
      const body = { trelloAccount: trelloAccount, githubAccount: githubAccount };
      const headers = new Headers({
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`
      });
      return this.http.put(url, body, { headers })
        .map(res => {
          return res.json();
        })
        .catch((error: Response) => {
          return Observable.throw(error.json());
        })
    }
  }

  getToken() {
    return JSON.parse(localStorage.getItem('token'));
  }

}
