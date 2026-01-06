import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VendorLoginPageRoutingModule } from './vendor-login-routing.module';

import { VendorLoginPage } from './vendor-login.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VendorLoginPageRoutingModule
  ]
})
export class VendorLoginPageModule {}
