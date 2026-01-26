import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Booking {
  _id?: string;
  customerName: string;
  customerPhone: string;
  serviceType: string;
  slotTime: string;
  vendorId: string;
  location: string;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private baseUrl = 'http://localhost:3000/api/bookings';
  private vendorUrl = 'http://localhost:3000/api/vendor';

  constructor(private http: HttpClient) {}

  // CUSTOMER: create booking
  createBooking(data: any): Observable<any> {
    return this.http.post(this.baseUrl, data);
  }

  // VENDOR: get bookings
  getVendorBookings(vendorId: string): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.baseUrl}/vendor/${vendorId}`);
  }

  // VENDOR: confirm booking
  confirmBooking(bookingId: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/${bookingId}/confirm`, {});
  }

  // Check vendor status
  checkVendorStatus(vendorId: string): Observable<any> {
    return this.http.get<any>(`${this.vendorUrl}/status/${vendorId}`);
  }

  // Set vendor status
  setVendorStatus(vendorId: string, status: string): Observable<any> {
    return this.http.post<any>(`${this.vendorUrl}/status`, { vendorId, status });
  }
}
