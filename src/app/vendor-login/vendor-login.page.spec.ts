import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VendorLoginPage } from './vendor-login.page';

describe('VendorLoginPage', () => {
  let component: VendorLoginPage;
  let fixture: ComponentFixture<VendorLoginPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorLoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
