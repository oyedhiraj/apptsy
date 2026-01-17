import { Component } from '@angular/core';
import {
  IonicModule,
  ToastController,
  LoadingController
} from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router,ActivatedRoute } from '@angular/router';
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

  bookingConfirmed = false;

  member:any;

  service = {
    price: 499,
    duration: '1 Hour'
  };

  vendorId = 'VENDOR_001';
  selectedSlot!: any;

  timeSlots = [
    { label: 'Morning', slots: ['09:00 AM', '10:00 AM', '11:00 AM'] },
    { label: 'Afternoon', slots: ['12:00 PM', '01:00 PM', '03:00 PM'] },
    { label: 'Evening', slots: ['05:00 PM', '06:00 PM', '07:00 PM'] }
  ];

  constructor(
    private bookingService: BookingService,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private router: Router,
    private route : ActivatedRoute
  ) {}

  ngOnInit() {
  this.route.params.subscribe(params => {
    this.member = params;
  });
}

  selectSlot(slot: string) {
    this.selectedSlot = new Date(`${slot}`);
  }

  async bookSlot() {
    if (!this.selectedSlot) {
      this.showToast('Please select a time slot', 'warning');
      return;
    }

    const loading = await this.loadingCtrl.create({
      message: 'Confirming your booking...'
    });
    await loading.present();

    const bookingData = {
      customerName: this.member.name,
      customerPhone: '9876543210',
      serviceType: this.member.service,
      slotTime: this.selectedSlot,
      vendorId: this.vendorId,
      customerLocation: this.member.location
    };

    this.bookingService.createBooking(bookingData).subscribe({
      next: async () => {
        await loading.dismiss();
        this.bookingConfirmed = true;
      },
      error: async () => {
        await loading.dismiss();
        this.showToast('Booking failed', 'danger');
      }
    });
    // loading.dismiss();
    // this.bookingConfirmed = true;
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
}
