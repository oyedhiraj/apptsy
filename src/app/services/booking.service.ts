import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Booking {
  _id?: string;
  customerName: string;
  customerPhone: string;
  serviceType: string;
  slotTime: string;
  vendorId: string;
  location: string;
  status: 'pending' | 'confirmed' | 'cancelled';
}

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private baseUrl = 'https://apptsybackend1.onrender.com/api/bookings';

  constructor(private http: HttpClient) { }

  private authHeaders() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    };
  }

  // CUSTOMER → CREATE BOOKING
  createBooking(data: any): Observable<any> {
    return this.http.post(
      this.baseUrl,
      data,
      this.authHeaders()
    );
  }

  // VENDOR → GET OWN BOOKINGS
  getVendorBookings(vendorId: string): Observable<Booking[]> {
    return this.http.get<Booking[]>(
      `${this.baseUrl}/vendor/${vendorId}`,
      this.authHeaders()
    );
  }

  getUserBookings(userId: string): Observable<Booking[]> {
    return this.http.get<Booking[]>(
      `${this.baseUrl}/user/${userId}`,
      this.authHeaders()
    );
  }

  // VENDOR → CONFIRM BOOKING
  confirmBooking(bookingId: string): Observable<any> {
    return this.http.put(
      `${this.baseUrl}/${bookingId}/confirm`,
      {},
      this.authHeaders()
    );
  }

  // VENDOR → CANCEL BOOKING
  cancelBooking(bookingId: string): Observable<any> {
    return this.http.put(
      `${this.baseUrl}/${bookingId}/cancel`,
      {},
      this.authHeaders()
    );
  }

}