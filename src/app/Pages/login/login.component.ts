import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { CommonModule } from '@angular/common';

import {
  FormsModule,
  FormGroup,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { APIService } from '../../api.service';
import { loginRequest, registerRequest } from '../../models/auth';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [APIService],
})
export class LoginComponent {
  constructor(
    private apiService: APIService,
    private router: Router,
    private _fb: FormBuilder
  ) {}

  loginForm: FormGroup = this._fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });
  registerForm: FormGroup = this._fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
    username: ['', Validators.required],
  });

  sendLogin() {
    const localUsers = localStorage.getItem('Users');
    if (localUsers != null) {
      const users = JSON.parse(localUsers);
      const isUserPresent = users.find(
        (user: loginRequest) =>
          user.email == this.loginForm.get('email')?.value &&
          user.password == this.loginForm.get('password')?.value
      );
      if (isUserPresent != undefined) {
        alert('user found');
        localStorage.setItem('loggedUser', JSON.stringify(isUserPresent));
        this.router.navigateByUrl('/layout');
      } else {
        alert('No user Found');
      }
    }
    /* this.apiService
      .onLogin(this.loginForm.value as unknown as loginRequest)
      .subscribe((data: any) => {
        if (data.res) {
          alert('Basarili');
          this.router.navigateByUrl('/dashboard');
        } else {
          alert('Basarisiz');
        }
       });*/
  }
  sendRegister() {
    const localUser = localStorage.getItem('Users');
    if (localUser != null) {
      const users = JSON.parse(localUser);
      users.push(this.registerForm.value as registerRequest);
      localStorage.setItem('Users', JSON.stringify(users));
    } else {
      const users = [];
      users.push(this.registerForm.value as registerRequest);
      localStorage.setItem('Users', JSON.stringify(users));
    }
    alert('Registration Success');

    /*this.apiService
      .onLogin(this.registerForm.value as unknown as registerRequest)
      .subscribe((data: any) => {
        if (data.res) {
          alert('Basarili');
          this.router.navigateByUrl('/dashboard');
        } else {
          alert('Basarisiz');
        }
      });
    */
  }
}
