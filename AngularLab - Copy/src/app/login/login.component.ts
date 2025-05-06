import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginCredentials = {
    email: '',
    password: ''
  };
  hidePassword = true;

  constructor(
    private authService: AuthService,
    private route: Router
  ) {}

  login() {
    if (this.loginCredentials.email === '' || this.loginCredentials.password === '') {
      console.error('Email and password are required');
      return;
    }

    this.authService.login(this.loginCredentials).subscribe(
      (response) => {
        console.log('Login successful:', response);
        this.route.navigate(['/dashboard']);
      },
      (error) => {
        console.error('Login failed:', error);
      }
    );
    this.route.navigate(['/dashboard']);
  }
}