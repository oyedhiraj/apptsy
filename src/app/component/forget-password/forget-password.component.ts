import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class ForgetPasswordComponent {

  email: string = '';
  newPassword: string = '';
  confirmPassword: string = '';

  // ✅ ADD THESE (Missing before)
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  passwordError: string = '';

  constructor(private router: Router) {}

  // ✅ Toggle Password
  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  // ✅ Toggle Confirm Password
  toggleConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  // ✅ Reset Password Logic
  async resetPassword() {

    this.passwordError = '';

    if (!this.email || !this.newPassword || !this.confirmPassword) {
      this.passwordError = 'Please fill all fields';
      return;
    }

    if (this.newPassword.length < 6) {
      this.passwordError = 'Password must be at least 6 characters';
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      this.passwordError = 'Passwords do not match';
      return;
    }

    try {
      const response = await fetch(
        'http://192.168.0.114:3000/api/reset-password',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: this.email,
            newPassword: this.newPassword
          })
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert('Password updated successfully');
        this.router.navigate(['/auth']);
      } else {
        this.passwordError = data.message || 'Something went wrong';
      }

    } catch (error) {
      this.passwordError = 'Server not responding';
    }
  }

  // ✅ Back to Login
  goBackToLogin() {
    this.router.navigate(['/auth']);
  }
}
