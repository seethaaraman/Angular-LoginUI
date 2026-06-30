import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { AuthService } from '../../services/auth';
import { User } from '../../models/user';
imports: [
  CommonModule,
  FormsModule,
  RouterModule
]

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  user = {
    email: '',
    password: ''
  };

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login() {

    this.authService.login(this.user).subscribe({

      next: (response) => {

        alert('Login Successful');

        localStorage.setItem('user', JSON.stringify(response));

        this.router.navigate(['/dashboard']);
      },

      error: (err) => {

        console.log(err);

        alert('Invalid Email or Password');

      }

    });

  }

}