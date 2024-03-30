import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { loginRequest, registerRequest } from './models/auth';

@Injectable({
  providedIn: 'root',
})
export class APIService {
  constructor(private http: HttpClient, private router: Router) {}

  onLogin(loginData: loginRequest) {
    return this.http.post('https://dummyjson.com/auth/login', loginData);
  }

  onRegister(registerData: registerRequest) {
    return this.http.post('http://localhost:8080/api/v1/', registerData);
  }
}
