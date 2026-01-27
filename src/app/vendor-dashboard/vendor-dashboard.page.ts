import { Component, OnInit } from '@angular/core';
import { IonicModule, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BookingService, Booking } from '../services/booking.service';

@Component({
  selector: 'app-vendor-dashboard',
  standalone: true,
  templateUrl: './vendor-dashboard.page.html',
  styleUrls: ['./vendor-dashboard.page.scss'],
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule]
})
export class VendorDashboardPage implements OnInit {

  bookings: Booking[] = [];
  vendorId: string = '';
  isLoading = true;
  selectedStatus: 'all' | 'pending' | 'confirmed' | 'cancelled' = 'all';

  constructor(
    private bookingService: BookingService,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.vendorId = localStorage.getItem('vendorId') || '';

    if (!this.vendorId) {
      this.showToast('Vendor not logged in. Please login again.', 'danger');
      return;
    }

    this.loadBookings();
  }

  loadBookings() {
    this.isLoading = true;

    this.bookingService.getVendorBookings(this.vendorId).subscribe({
      next: (res) => {
        this.bookings = res;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        this.showToast('Failed to load bookings', 'danger');
      }
    });
  }

  refreshBookings(event: any) {
    this.bookingService.getVendorBookings(this.vendorId).subscribe({
      next: (res) => {
        this.bookings = res;
        event.target.complete();
      },
      error: () => {
        event.target.complete();
        this.showToast('Refresh failed', 'danger');
      }
    });
  }

  get filteredBookings(): Booking[] {
    if (this.selectedStatus === 'all') {
      return this.bookings;
    }
    return this.bookings.filter(b => b.status === this.selectedStatus);
  }

  confirmBooking(bookingId: string) {
    this.bookingService.confirmBooking(bookingId).subscribe({
      next: () => {
        this.showToast('Booking confirmed', 'success');
        this.loadBookings();
      },
      error: () => {
        this.showToast('Failed to confirm booking', 'danger');
      }
    });
  }

  callCustomer(phone: string) {
    window.open(`tel:${phone}`, '_system');
  }

  getStatusColor(status: string) {
    switch (status) {
      case 'pending': return 'warning';
      case 'confirmed': return 'success';
      case 'cancelled': return 'danger';
      default: return 'medium';
    }
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
