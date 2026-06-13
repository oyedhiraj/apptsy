import { Component } from '@angular/core';
import {
  IonicModule,
  ToastController,
  LoadingController
} from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BookingService } from '../../services/booking.service';
import { lastValueFrom } from 'rxjs';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-service-booking',
  standalone: true,
  templateUrl: './service-booking.component.html',
  styleUrls: ['./service-booking.component.scss'],
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule]
})
export class ServiceBookingComponent {

  bookingConfirmed = false;
  member: any;
  service = { price: 499, duration: '1 Hour' };

  selectedDateTime: any;
  minDate = new Date().toISOString();
  termsAccepted = false;

  constructor(
    private bookingService: BookingService,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private router: Router,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    const state = this.router.getCurrentNavigation()?.extras.state as { member: any };
    this.member = state?.member;

    if (!this.member) {
      this.showToast('Member data missing!', 'danger');
      this.router.navigate(['/member-info']);
    }
  }

 async bookSlot() {
  if (!this.termsAccepted) {
    this.showToast(
      'Please accept Terms & Conditions first',
      'warning'
    );
    return;
  }

  if (!this.selectedDateTime) {
    this.showToast(
      'Please select date & time',
      'warning'
    );
    return;
  }

  try {
    await lastValueFrom(
      this.bookingService.createBooking({
        vendorId: this.member._id,
        customerPhone: this.member.phone,
        serviceType: this.member.serviceType,
        slotTime: this.selectedDateTime,
        location: this.member.location
      })
    );

    this.bookingConfirmed = true;
    this.showToast('Booking Confirmed', 'success');

  } catch (err: any) {
    this.showToast(err.error.message || 'Vendor is busy', 'danger');
  }
}


  goToHistory() {
    this.router.navigate(['/booking-history']);
  }

  async showToast(message: string, color: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      color
    });
    toast.present();
  }

  acceptTerms() {
  this.termsAccepted = true;
}

goBack() {
  if (!this.termsAccepted) {
    this.showToast(
      'Please accept Terms & Conditions first',
      'warning'
    );
  }
  this.router.navigate(['/member-info']);
}

}
