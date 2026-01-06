import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, LoadingController, AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-add-member-info',
  templateUrl: './add-member-info.component.html',
  styleUrls: ['./add-member-info.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class AddMemberInfoComponent {

  memberForm: FormGroup;
  isSubmitted = false;

  // Dropdown values
  services = ['Plumbing', 'Electrician', 'Cleaning', 'Painting'];

  // API URL
  apiUrl = 'http://localhost:3000/api/member/add';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {
    this.memberForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      age: ['', [Validators.required, Validators.min(1), Validators.max(120)]],
      number: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      address: ['', Validators.required],
      service: ['', Validators.required]   // 🔹 dropdown field
    });
  }

  get f() {
    return this.memberForm.controls;
  }

  async submitForm() {
    this.isSubmitted = true;

    if (this.memberForm.invalid) {
      return;
    }

    const loader = await this.loadingCtrl.create({
      message: 'Submitting member info...'
    });
    await loader.present();

    this.http.post(this.apiUrl, this.memberForm.value).subscribe({
      next: async () => {
        await loader.dismiss();
        this.memberForm.reset();
        this.isSubmitted = false;

        const alert = await this.alertCtrl.create({
          header: 'Success',
          message: 'Member information submitted successfully!',
          buttons: ['OK']
        });
        await alert.present();
      },
      error: async () => {
        await loader.dismiss();

        const alert = await this.alertCtrl.create({
          header: 'Error',
          message: 'Failed to submit member info. Please try again.',
          buttons: ['OK']
        });
        await alert.present();
      }
    });
  }
}
