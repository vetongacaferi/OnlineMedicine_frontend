import { AuthenticationService } from './../_services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
import { Router } from '@angular/router';



@Component({templateUrl: 'admin.component.html'})
export class AdminComponent implements OnInit {

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
        ) {}

    ngOnInit() {     
    }

    
    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
}