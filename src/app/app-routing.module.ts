import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // {
  //   path: 'signup',
  //   loadChildren: () => import('./signup/signup.module').then(m => m.SignupPageModule)
  // },
  // {
  //   path: '',
  //   redirectTo: 'signup',
  //   pathMatch: 'full'
  // }
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
  path: 'register',
  loadComponent: () => import('./component/register/register.component').then(m => m.RegisterComponent)
  },
  {
  path: 'subscription',
  loadComponent: () => import('./component/subscription/subscription.component').then(m => m.SubscriptionComponent)
  },

  {
  path: 'addMemberInfoComponent',
  loadComponent: () => import('./component/add-member-info/add-member-info.component').then(m => m.AddMemberInfoComponent)
  },

  {
  path: 'service-booking',
  loadComponent: () => import('./component/service-booking/service-booking.component').then(m => m.ServiceBookingComponent)
  },

  {
    path:'app-add-member-info',
    loadComponent:() => import('./component/add-member-info/add-member-info.component').then(m=>m.AddMemberInfoComponent)
  },

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'vendor-login',
    loadChildren: () => import('./vendor-login/vendor-login.module').then( m => m.VendorLoginPageModule)
  },
  {
    path: 'member-info',
    loadChildren: () => import('./member-info/member-info.module').then( m => m.MemberInfoPageModule)
  },
  {
    path: 'customer-login',
    loadChildren: () => import('./customer-login/customer-login.module').then( m => m.CustomerLoginPageModule)
  },
  {
    path: 'member-info',
    loadChildren: () => import('./member-info/member-info.module').then( m => m.MemberInfoPageModule)
  },
  {
    path: 'vendor-dashboard',
    loadComponent: () =>import('./vendor-dashboard/vendor-dashboard.page').then(m => m.VendorDashboardPage)
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthPageModule)
  },
  {
  path: 'booking-history',
  loadComponent: () => import('./component/booking-history/booking-history.component').then(m => m.BookingHistoryComponent)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
