import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/Services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerCredentials = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  };
  hidePassword = true;
  hideConfirmPassword = true;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  register() {
    if (this.registerCredentials.password !== this.registerCredentials.confirmPassword) {
      console.error('Passwords do not match');
      return;
    }

    this.authService.register(this.registerCredentials).subscribe(
      (response) => {
        console.log('Registration successful:', response);
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Registration failed:', error);
      }
    );
  }
}