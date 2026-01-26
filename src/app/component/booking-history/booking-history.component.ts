import { Component, OnInit } from '@angular/core';
import { IonicModule, LoadingController, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'app-booking-history',
  standalone: true,
  templateUrl: './booking-history.component.html',
  styleUrls: ['./booking-history.component.scss'],
  imports: [IonicModule, CommonModule]
})
export class BookingHistoryComponent implements OnInit {

  bookings: any[] = [];
  vendorId = '';  // will set dynamically

  constructor(
    private bookingService: BookingService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    // get vendorId from localStorage or login session
    this.vendorId = localStorage.getItem('vendorId') || '';

    if (!this.vendorId) {
      this.showToast('Vendor ID not found', 'danger');
      return;
    }

    this.loadBookings();
  }

  async loadBookings() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading bookings...'
    });
    await loading.present();

    this.bookingService.getVendorBookings(this.vendorId).subscribe({
      next: (res: any) => {
        this.bookings = res.map((b: any) => ({
          ...b,
          slotTime: new Date(b.slotTime).toLocaleString()
        }));
        loading.dismiss();
      },
      error: (err) => {
        loading.dismiss();
        this.showToast('Failed to load bookings', 'danger');
        console.error(err);
      }
    });
  }

  async showToast(message: string, color: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      color
    });
    toast.present();
  }
}
