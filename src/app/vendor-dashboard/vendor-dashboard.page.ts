import { Component, OnInit } from '@angular/core';
import { IonicModule, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BookingService } from '../services/booking.service';

@Component({
  selector: 'app-vendor-dashboard',
  standalone: true,
  templateUrl: './vendor-dashboard.page.html',
  styleUrls: ['./vendor-dashboard.page.scss'],
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule]
})
export class VendorDashboardPage implements OnInit {

  bookings: any[] = [];
  vendorId = '';
  isLoading = true;
  selectedStatus = 'all';

  constructor(
    private bookingService: BookingService,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.vendorId = localStorage.getItem('vendorId') || '';
    this.loadBookings();
  }

  loadBookings() {
    if (!this.vendorId) {
      this.showToast('Vendor ID missing. Please login again.', 'danger');
      return;
    }

    this.isLoading = true;
    this.bookingService.getVendorBookings(this.vendorId).subscribe(res => {
      this.bookings = res as any[];
      this.isLoading = false;
    }, err => {
      this.isLoading = false;
      this.showToast('Failed to load bookings', 'danger');
    });
  }

  refreshBookings(event: any) {
    this.bookingService.getVendorBookings(this.vendorId).subscribe(res => {
      this.bookings = res as any[];
      event.target.complete();
    }, () => {
      event.target.complete();
      this.showToast('Refresh failed', 'danger');
    });
  }

  get filteredBookings() {
    if (this.selectedStatus === 'all') return this.bookings;
    return this.bookings.filter(b => b.status === this.selectedStatus);
  }

  async confirmBooking(id: string) {
    this.bookingService.confirmBooking(id).subscribe(async () => {
      const toast = await this.toastCtrl.create({
        message: 'Booking confirmed',
        duration: 2000,
        color: 'success'
      });
      toast.present();
      this.loadBookings();
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
