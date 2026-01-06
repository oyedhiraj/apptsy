import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CustomerLoginPageRoutingModule } from './customer-login-routing.module';

import { CustomerLoginPage } from './customer-login.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CustomerLoginPageRoutingModule
  ]
})
export class CustomerLoginPageModule {}
