import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private baseUrl = 'http://localhost:3000/api/bookings';

  constructor(private http: HttpClient) {}

  // CUSTOMER: create booking
  createBooking(data: any): Observable<any> {
    return this.http.post(this.baseUrl, data);
  }

  // VENDOR: get bookings
  getVendorBookings(vendorId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/vendor/${vendorId}`);
  }

  // VENDOR: confirm booking
  confirmBooking(bookingId: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/${bookingId}/confirm`, {});
  }
}
