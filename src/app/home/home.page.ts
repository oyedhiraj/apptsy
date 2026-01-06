import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage {
  services = [
    { name: 'Carpenter', icon: 'hammer-outline', color: 'linear-gradient(135deg, #ffb300, #ff6f00)' },
    { name: 'Electrician', icon: 'flash-outline', color: 'linear-gradient(135deg, #2196f3, #0d47a1)' },
    { name: 'Plumber', icon: 'water-outline', color: 'linear-gradient(135deg, #26c6da, #006064)' },
    { name: 'Delivery Boy', icon: 'bicycle-outline', color: 'linear-gradient(135deg, #8bc34a, #33691e)' },
  ];

  selectedService: any = null;
  showPopup = false;

  constructor(private router: Router) {}

  openPopup(service: any) {
    this.selectedService = service;
    this.showPopup = true;
  }

  closePopup() {
    this.showPopup = false;
  }

  loginAs(role: 'Vendor' | 'Customer') {
    this.closePopup();
    localStorage.setItem('loginRole', role.toLowerCase());  // saves "vendor" or "customer"
    this.router.navigate(['/auth'], {
      queryParams: { service: this.selectedService.name }
    });
}

}
