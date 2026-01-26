import { Component, OnInit } from '@angular/core';
import { IonicModule, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface Member {
  _id: string;
  name: string;
  age: number;
  location: string;
  gender: 'male' | 'female' | 'other';
  serviceType: string;
  profilePhotoPath: string;
}

@Component({
  selector: 'app-member-info',
  templateUrl: './member-info.page.html',
  styleUrls: ['./member-info.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class MemberInfoPage implements OnInit {

  members: Member[] = [];
  filteredMembers: Member[] = [];

  isFilterOpen = false;
  searchText = '';

  locations: string[] = [];
  services: string[] = [];
  genders: string[] = ['male', 'female', 'other'];

  selectedLocations: string[] = [];
  selectedServices: string[] = [];
  selectedGenders: string[] = [];

  constructor(
    private router: Router,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.getMembersFromAPI();
  }

  async getMembersFromAPI() {
    try {
      const res = await fetch('http://localhost:3000/api/vendors'); // your API
      const data = await res.json();

      const vendors = data.filter((user: any) => user.role === 'vendor');

      this.members = vendors.map((v: any) => ({
        _id: v._id,
        name: v.name,
        age: v.age || 0,
        location: v.address || 'Unknown',
        gender: v.gender || 'other',
        serviceType: v.serviceType || 'Not specified',
        profilePhotoPath: v.profilePhotoPath || ''
      }));

      this.filteredMembers = [...this.members];
      this.locations = [...new Set(this.members.map(m => m.location))];
      this.services = [...new Set(this.members.map(m => m.serviceType))];

    } catch (error) {
      console.error(error);
      this.showToast('Failed to load members', 'danger');
    }
  }

  getPhotoUrl(path: string) {
    if (!path) {
      return 'assets/default-avatar.png'; // fallback image
    }
    return `http://localhost:3000/${path}`;
  }

  provideService(member: Member) {
    this.router.navigate(['/service-booking'], {
      state: { member }
    });
  }

  getServiceIcon(service: string) {
    switch (service.toLowerCase()) {
      case 'carpenter': return 'hammer-outline';
      case 'plumber': return 'cog-outline';
      case 'electrician': return 'flash-outline';
      default: return 'person-outline';
    }
  }

  toggleSelection(type: 'location'|'service'|'gender', value: string) {
    let arr: string[];
    if(type === 'location') arr = this.selectedLocations;
    else if(type === 'service') arr = this.selectedServices;
    else arr = this.selectedGenders;

    const index = arr.indexOf(value);
    if(index > -1) arr.splice(index, 1);
    else arr.push(value);
  }

  applyFilter() {
    this.filteredMembers = this.members.filter(member => {
      const locMatch = this.selectedLocations.length ? this.selectedLocations.includes(member.location) : true;
      const svcMatch = this.selectedServices.length ? this.selectedServices.includes(member.serviceType) : true;
      const genderMatch = this.selectedGenders.length ? this.selectedGenders.includes(member.gender) : true;
      const searchMatch = this.searchText
        ? member.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
          member.serviceType.toLowerCase().includes(this.searchText.toLowerCase())
        : true;
      return locMatch && svcMatch && genderMatch && searchMatch;
    });
    this.isFilterOpen = false;
  }

  resetFilter() {
    this.selectedLocations = [];
    this.selectedServices = [];
    this.selectedGenders = [];
    this.searchText = '';
    this.filteredMembers = [...this.members];
  }

  async showToast(message: string, color: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      color
    });
    toast.present();
  }
}
