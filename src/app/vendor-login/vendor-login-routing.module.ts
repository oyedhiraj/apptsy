import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VendorLoginPage } from './vendor-login.page';

const routes: Routes = [
  {
    path: '',
    component: VendorLoginPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VendorLoginPageRoutingModule {}
