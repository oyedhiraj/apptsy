import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { BookingService } from '../../services/booking.service'

@Component({
  selector: 'app-booking-history',
  standalone: true,
  templateUrl: './booking-history.component.html',
  styleUrls: ['./booking-history.component.scss'],
  imports: [IonicModule, CommonModule]
})
export class BookingHistoryComponent {

  bookings: any[] = [];

  constructor(private bookingService: BookingService) {
    this.loadBookings();
  }

  loadBookings() {
    // this.bookingService.getBookings().subscribe({
    //   next: (res: any) => {
    //     this.bookings = res;
    //   },
    //   error: (err) => {
    //     console.error('Failed to fetch bookings', err);
    //   }
    // });
    alert("done");
  }
}
