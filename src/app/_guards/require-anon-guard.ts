﻿import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class RequireAnonGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser: any = localStorage.getItem('currentUser')
        if (!currentUser) {
            // not logged in so return true
            return true;
        } else {
            // logged in so redirect to profile page
            this.router.navigate([`/profile/${currentUser.ui}`]);
            return false;
        }
    }
}