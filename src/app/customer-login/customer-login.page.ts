import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-customer-login',
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule],
  templateUrl: './customer-login.page.html',
  styleUrls: ['./customer-login.page.scss']
})
export class CustomerLoginPage {

  serviceName = 'My Service';

  user = {
    email: '',
    password: ''
  };

  constructor(private router: Router) {}

  backtohome() {
    this.router.navigate(['/home']);
  }

  async login() {
    if (!this.user.email || !this.user.password) {
      alert('Email and password are required');
      return;
    }

    try {
      const response = await fetch('http://192.168.0.114:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.user)
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || 'Login failed');
        return;
      }

      // ✅ Save JWT
      localStorage.setItem('token', data.token);

      alert('Login successful');
      this.router.navigate(['/member-info']);

    } catch (error) {
      alert('Server not responding');
      console.error(error);
    }
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
