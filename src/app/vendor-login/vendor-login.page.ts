import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-vendor-login',
  standalone: true,
  imports: [IonicModule,FormsModule, CommonModule],
  templateUrl: './vendor-login.page.html',
  styleUrls: ['./vendor-login.page.scss']
})
export class VendorLoginPage {
   serviceName = 'My Service';
  user = { email: '', password: '' };

  constructor(private router: Router) {
    // this.route.queryParams.subscribe(params => {
    //   this.serviceName = params['service'] || '';
    // });
  }

  backtohome(){
      this.router.navigate(['/home'])
  }

  goToRegister(){
    this.router.navigate(['/register'])
  }
  
  login(){
    this.router.navigate(['/member-info']);
    console.log("Login vendor");
  }
}
 