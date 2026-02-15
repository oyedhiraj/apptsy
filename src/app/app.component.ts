import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnInit {

  userData: any = {
    name: '',
    email: ''
  };

  constructor(
    private router: Router,
    private http: HttpClient,
    private menuCtrl: MenuController
  ) {}

  ngOnInit() {
  this.menuCtrl.enable(true);
  this.userData = {
    name: 'Test User',
    email: 'test@test.com'
  };
}


  // loadUser() {
  //   this.http.get<any>('https://apptsybackend1.onrender.com/api/user')
  //     .subscribe({
  //       next: (res) => {
  //         this.userData = res;
  //       },
  //       error: (err) => {
  //         console.error('User API failed:', err);

  //         this.userData = {
  //           name: 'Guest User',
  //           email: 'guest@example.com'
  //         };
  //       }
  //     });
  // }

  logout() {
    localStorage.clear();
    this.router.navigate(['/auth']);
  }

  isActive(url: string) {
    return this.router.url === url;
  }
}
