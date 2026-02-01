import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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
export class HomePage implements OnInit {
  @ViewChild('headerLogo') headerLogo!: ElementRef;

  services = [
    { name: 'Carpenter', icon: 'hammer-outline', color: 'linear-gradient(135deg, #ffb300, #ff6f00)' },
    { name: 'Electrician', icon: 'flash-outline', color: 'linear-gradient(135deg, #2196f3, #0d47a1)' },
    { name: 'Plumber', icon: 'water-outline', color: 'linear-gradient(135deg, #26c6da, #006064)' },
    { name: 'Delivery Boy', icon: 'bicycle-outline', color: 'linear-gradient(135deg, #8bc34a, #33691e)' },
  ];

  selectedService: any = null;
  showPopup = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.initializeLogo();
  }

  initializeLogo() {
    // ensure header logo visible
    const headerImg = document.getElementById('headerLogo') as HTMLImageElement | null;
    if (headerImg) {
      headerImg.style.display = 'block';
      headerImg.style.opacity = '1';
    }

    // use the provided splash image for the full-page splash
    const splashImg = document.querySelector('.splash-logo') as HTMLImageElement | null;
    if (splashImg) {
      splashImg.src = 'assets/icon/splash-screen.png';
      splashImg.onload = () => console.log('Splash image loaded:', splashImg.src);
      splashImg.onerror = () => console.error('Splash image failed to load:', splashImg.src);
    }
  }

  ngAfterViewInit() {
    if (this.headerLogo) {
      console.log('Logo element found via ViewChild!');
    }
  }

  openPopup(service: any) {
    this.selectedService = service;
    this.showPopup = true;
  }

  closePopup() {
    this.showPopup = false;
  }

  loginAs(role: 'Vendor' | 'Customer') {
    this.closePopup();
    localStorage.setItem('loginRole', role.toLowerCase());
    this.router.navigate(['/auth'], {
      queryParams: { service: this.selectedService.name }
    });
  }
}
