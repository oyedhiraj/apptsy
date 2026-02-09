import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  constructor(private router: Router) {}

  user = {
    fullName: '',
    email: '',
    password: '',
    number: '',
    age: '',
    address: '',
    gender: '',        // Added
    role: '',
    serviceType: ''
  };

  aadhaarFile: File | null = null;
  profileFile: File | null = null;
  aadhaarFileName = '';
  profilePreview: string | ArrayBuffer | null = null;

  backtohome() {
    this.router.navigate(['/auth']);
  }

  onProfileSelect(event: any) {
    const file = event.target.files[0];
    if (!file) return;
    this.profileFile = file;

    const reader = new FileReader();
    reader.onload = () => this.profilePreview = reader.result;
    reader.readAsDataURL(file);
  }

  onAadhaarSelect(event: any) {
    const file = event.target.files[0];
    if (!file) return;
    this.aadhaarFile = file;
    this.aadhaarFileName = file.name;
  }

  async onRegister() {

    if (
      !this.user.fullName ||
      !this.user.email ||
      !this.user.password ||
      !this.user.gender ||
      !this.user.role ||
      !this.profileFile ||
      !this.aadhaarFile
    ) {
      alert('Please fill all required fields');
      return;
    }

    if (this.user.role === 'vendor' && !this.user.serviceType) {
      alert('Please select type of service');
      return;
    }

    const formData = new FormData();
    formData.append('fullName', this.user.fullName);
    formData.append('email', this.user.email);
    formData.append('password', this.user.password);
    formData.append('number', this.user.number);
    formData.append('age', this.user.age);
    formData.append('address', this.user.address);
    formData.append('gender', this.user.gender); // Added
    formData.append('role', this.user.role);
    formData.append('profilePhoto', this.profileFile);
    formData.append('aadhaar', this.aadhaarFile);

    if (this.user.role === 'vendor') {
      formData.append('serviceType', this.user.serviceType);
    }

    try {
      const response = await fetch('http://192.168.0.114:3000/api/register', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || 'Registration failed');
        return;
      }

      alert('Registered successfully');
      this.router.navigate(['/login']);

    } catch (error) {
      console.error(error);
      alert('Server error');
    }
  }
}
