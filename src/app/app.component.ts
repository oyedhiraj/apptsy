import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {

  
  userData: any;

  constructor(private router: Router, private http: HttpClient,private menuCtrl: MenuController) {
    this.loadUser();
    this.menuCtrl.enable(true);
  }

  // Dynamic user data from API
  loadUser() {
    // Replace with your API URL
    this.http.get('https://api.example.com/user').subscribe((res: any) => {
      this.userData = res;
    }, () => {
      // fallback if API fails
      this.userData = { name: 'John Doe', email: 'john@example.com' };
    });
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  isActive(url: string) {
    return this.router.url === url;
  }
}
