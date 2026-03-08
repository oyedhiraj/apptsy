import { Component, OnInit } from '@angular/core';
import { IonicModule, ToastController, AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookingService, Booking } from '../services/booking.service';

@Component({
  selector: 'app-vendor-dashboard',
  standalone: true,
  templateUrl: './vendor-dashboard.page.html',
  styleUrls: ['./vendor-dashboard.page.scss'],
  imports: [IonicModule, CommonModule, FormsModule]
})
export class VendorDashboardPage implements OnInit {

  bookings: Booking[] = [];

  vendorId = '';

  isLoading = true;

  actionLoading = false;

  selectedStatus: 'all' | 'pending' | 'confirmed' | 'cancelled' = 'all';

  constructor(
    private bookingService: BookingService,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {

    this.vendorId = localStorage.getItem('vendorId') || '';

    if (!this.vendorId) {
      this.showToast('Vendor not logged in', 'danger');
      return;
    }

    this.loadBookings();
  }

  // LOAD BOOKINGS
  loadBookings() {

    this.isLoading = true;

    this.bookingService.getVendorBookings(this.vendorId).subscribe({

      next: (res) => {
        this.bookings = res;
        this.isLoading = false;
      },

      error: (err) => {
        console.error(err);
        this.isLoading = false;
        this.showToast('Failed to load bookings', 'danger');
      }

    });

  }

  // PULL TO REFRESH
  refreshBookings(event: any) {

    this.bookingService.getVendorBookings(this.vendorId).subscribe({

      next: (res) => {
        this.bookings = res;
        event.target.complete();
      },

      error: () => {
        event.target.complete();
      }

    });

  }

  // FILTER BOOKINGS
  get filteredBookings() {

    if (this.selectedStatus === 'all') {
      return this.bookings;
    }

    return this.bookings.filter(
      b => b.status === this.selectedStatus
    );

  }

  // CONFIRM BOOKING
  confirmBooking(id: string) {

    if (this.actionLoading) return;

    this.actionLoading = true;

    this.bookingService.confirmBooking(id).subscribe({

      next: () => {

        // Update UI instantly
        const booking = this.bookings.find(b => b._id === id);
        if (booking) booking.status = 'confirmed';

        this.showToast('Booking confirmed', 'success');

        this.actionLoading = false;
      },

      error: (err) => {
        console.error(err);
        this.showToast('Confirm failed', 'danger');
        this.actionLoading = false;
      }

    });

  }

  // CANCEL BOOKING
  async cancelBooking(id: string) {

    const alert = await this.alertCtrl.create({
      header: 'Cancel Booking',
      message: 'Are you sure?',
      buttons: [
        { text: 'No', role: 'cancel' },
        {
          text: 'Yes',
          handler: () => {

            if (this.actionLoading) return;

            this.actionLoading = true;

            this.bookingService.cancelBooking(id).subscribe({

              next: () => {

                const booking = this.bookings.find(b => b._id === id);
                if (booking) booking.status = 'cancelled';

                this.showToast('Booking cancelled', 'warning');

                this.actionLoading = false;
              },

              error: (err) => {
                console.error(err);
                this.showToast('Cancel failed', 'danger');
                this.actionLoading = false;
              }

            });

          }
        }
      ]
    });

    await alert.present();
  }

  // CALL CUSTOMER
  callCustomer(phone: string) {
    window.open(`tel:${phone}`, '_system');
  }

  // STATUS COLOR
  getStatusColor(status: string) {

    switch (status) {
      case 'pending':
        return 'warning';

      case 'confirmed':
        return 'success';

      case 'cancelled':
        return 'danger';

      default:
        return 'medium';
    }

  }

  // TOAST
  async showToast(message: string, color: string) {

    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      color
    });

    toast.present();
  }

}