import { Component, EventEmitter, Output } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

declare var Razorpay: any; // Razorpay global variable

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class SubscriptionComponent {

  plans = [
    { name: 'Basic', price: 10, icon: 'person-outline', features: ['1 Service', 'Email Support'], colorStart: '#4facfe', colorEnd: '#00f2fe' },
    { name: 'Standard', price: 25, icon: 'people-outline', features: ['5 Services', 'Priority Support'], colorStart: '#43e97b', colorEnd: '#38f9d7' },
    { name: 'Premium', price: 50, icon: 'star-outline', features: ['Unlimited Services', '24/7 Support'], colorStart: '#fa709a', colorEnd: '#fee140' }
  ];

  selectedPlan: any = null;

  @Output() onPaymentComplete = new EventEmitter<any>();

  constructor() {}

  selectPlan(plan: any) {
    this.selectedPlan = plan;
  }

  payNow() {
    if (!this.selectedPlan) {
      alert('Please select a plan!');
      return;
    }

    const amountInPaise = this.selectedPlan.price * 100; // Razorpay needs amount in paise

    // const options = {
    //   key: 'rzp_test_XXXXXXXXXXXX', // 👈 Replace with your Razorpay Test Key ID
    //   amount: amountInPaise,
    //   currency: 'INR',
    //   name: 'MyApp Subscriptions',
    //   description: `${this.selectedPlan.name} Plan`,
    //   image: 'https://yourapp.com/logo.png', // optional
    //   handler: (response: any) => {
    //     console.log('Payment Success:', response);
    //     alert('Payment Successful! Payment ID: ' + response.razorpay_payment_id);

    //     this.onPaymentComplete.emit({
    //       plan: this.selectedPlan,
    //       payment_id: response.razorpay_payment_id
    //     });
    //   },
    //   prefill: {
    //     name: 'John Doe',    // replace with dynamic user info
    //     email: 'john@example.com',
    //     contact: '9999999999'
    //   },
    //   theme: {
    //     color: '#3399cc'
    //   }
    // };

    const options = {
  key: 'rzp_test_XXXXXXXXXXXX', // Key ID from dashboard
  amount: this.selectedPlan.price * 100,
  currency: 'INR',
  name: 'MyApp Subscriptions',
  description: `${this.selectedPlan.name} Plan`,
  handler: (response: any) => {
    console.log('Payment Successful', response);
  }
};


    const rzp = new Razorpay(options);

    rzp.on('payment.failed', (response: any) => {
      console.error('Payment Failed:', response.error);
      alert('Payment Failed. Please try again.');
    });

    rzp.open();
  }
}
