import { Component, OnInit } from '@angular/core';
import {
  IonicModule,
  LoadingController,
  ToastController
} from '@ionic/angular';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'app-booking-history',
  standalone: true,
  templateUrl: './booking-history.component.html',
  styleUrls: ['./booking-history.component.scss'],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule
  ]
})

export class BookingHistoryComponent implements OnInit {

  bookings: any[] = [];
  userId = '';

  isFeedbackOpen = false;

  selectedBooking: any = null;

  feedbackRating = 0;
  feedbackComment = '';

  constructor(
    private bookingService: BookingService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {

    this.userId =
      localStorage.getItem('userId') || '';

    if (!this.userId) {

      this.showToast(
        'User ID not found',
        'danger'
      );

      return;
    }

    this.loadBookings();
  }

  async loadBookings() {

    const loading =
      await this.loadingCtrl.create({
        message: 'Loading bookings...'
      });

    await loading.present();

    this.bookingService
      .getUserBookings(this.userId)
      .subscribe({

        next: (res: any) => {

          this.bookings = res.map((b: any) => ({
            ...b,
            slotTime:
              new Date(b.slotTime)
              .toLocaleString()
          }));

          loading.dismiss();
        },

        error: (err) => {

          loading.dismiss();

          this.showToast(
            'Failed to load bookings',
            'danger'
          );

          console.error(err);
        }
      });
  }

  openFeedback(booking: any) {

    this.selectedBooking = booking;

    this.feedbackRating = 0;
    this.feedbackComment = '';

    this.isFeedbackOpen = true;
  }

  closeFeedback() {

    this.isFeedbackOpen = false;
  }

  

  async showToast(
    message: string,
    color: string
  ) {

    const toast =
      await this.toastCtrl.create({
        message,
        duration: 2000,
        color
      });

    toast.present();
  }


toggleFeedback(booking: any) {

  if (this.selectedBooking === booking) {

    this.selectedBooking = null;

  } else {

    this.selectedBooking = booking;
  }
}

submitFeedback(booking: any) {

  const body = {

    rating: booking.tempRating,

    comment: booking.tempComment

  };

  this.bookingService
    .submitFeedback(booking._id, body)
    .subscribe({

      next: (res: any) => {

        booking.feedback = {

          given: true,

          rating: body.rating,

          comment: body.comment
        };

        this.showToast(
          'Feedback submitted',
          'success'
        );

        this.selectedBooking = null;
      },

      error: (err) => {

        console.log(err);

        this.showToast(
          'Failed to submit feedback',
          'danger'
        );
      }
    });
}
}