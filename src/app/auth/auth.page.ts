import { Component } from '@angular/core';
import { IonicModule, IonButton, IonIcon, IonInput, IonLabel } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss']
})
export class AuthPage {
  email = '';
  password = '';
  role: 'vendor' | 'customer' = 'customer';
  service: string | null = null;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      if (params['service']) this.service = params['service'];
      if (localStorage.getItem('loginRole')) {
        this.role = localStorage.getItem('loginRole') as 'vendor' | 'customer';
      }
    });
  }

  async login() {
    if (!this.email || !this.password) {
      alert('Email and password are required');
      return;
    }

    try {
      const response = await fetch('http://192.168.0.114:3000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: this.email, password: this.password })
      });
      const data = await response.json();
      if (!response.ok || data.user.role != this.role) {
        alert(data.message || 'Invalid credentials');
        return;
      }
      localStorage.setItem('token', data.token);
      localStorage.setItem('vendorId', data.user.id);
      alert('Login successful');

      if (this.role === 'vendor') this.router.navigate(['/vendor-dashboard']);
      else this.router.navigate(['/member-info']);

    } catch (error) {
      console.error(error);
      alert('Server not responding. Try again later.');
    }
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  backToHome() {
    this.router.navigate(['/home']);
  }

  get roleClass() {
    return this.role; // for animation / styling
  }

  get roleIcon() {
    return this.role === 'vendor' ? 'briefcase-outline' : 'person-outline';
  }
}
