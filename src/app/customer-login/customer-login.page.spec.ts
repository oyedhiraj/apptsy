import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomerLoginPage } from './customer-login.page';

describe('CustomerLoginPage', () => {
  let component: CustomerLoginPage;
  let fixture: ComponentFixture<CustomerLoginPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerLoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
