import { AuthenticationService } from './../_services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router

  ) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      Id: 0,
      FirstName: '',
      LastName: '',
      UserName: '',
      Email: '',
      Password: '',
    });
  }


  onSubmit() {
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    
    const registerData: Register = Object.assign({}, this.registerForm.value);
    this.authenticationService.register(registerData)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['/login']);
        },
        error => {
          console.log('error register: ', error);
        });
  }
}
