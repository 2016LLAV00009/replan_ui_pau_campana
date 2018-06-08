import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
 
@Injectable()
export class AuthGuardAdmin implements CanActivate  {
 
    constructor(private router: Router) { }
 
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('currentUser')) {
            var currentUser = JSON.parse(localStorage.getItem('currentUser'));
            if (currentUser.isAdmin) return true;
            else {
                this.router.navigate(['/home']);
                return false;
            }
        }
 
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login']);
        return false;
    }
}