import { Component } from '@angular/core';
import { IonicModule, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'app-service-booking',
  standalone: true,
  templateUrl: './service-booking.component.html',
  styleUrls: ['./service-booking.component.scss'],
  imports: [IonicModule, CommonModule, HttpClientModule]
})
export class ServiceBookingComponent {

  member = {
    name: 'John Doe',
    service: 'Carpenter',
    Location: 'Sakinaka'
  };

  vendorId = 'VENDOR_001';

  constructor(
    private bookingService: BookingService,
    private toastCtrl: ToastController,
    private router: Router
  ) {}

  bookSlot() {
    const bookingData = {
      customerName: this.member.name,
      customerPhone: '9876543210',
      serviceType: this.member.service,
      slotTime: new Date(),
      vendorId: this.vendorId,
      customerLocation: this.member.Location
    };

    console.log('API CALL DATA:', bookingData);

    this.bookingService.createBooking(bookingData).subscribe({
      next: async () => {
        const toast = await this.toastCtrl.create({
          message: 'Slot booked successfully',
          duration: 2000,
          color: 'success'
        });
        toast.present();

        this.router.navigate(['/vendor-dashboard']);
      },
      error: async (err) => {
        console.error(err);
        const toast = await this.toastCtrl.create({
          message: 'Booking failed',
          duration: 2000,
          color: 'danger'
        });
        toast.present();
      }
    });
  }
}
