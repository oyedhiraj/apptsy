import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface Member {
  name: string;
  age: number;
  location: string;
  gender: 'male' | 'female';
  service: 'Carpenter' | 'Plumber' | 'Electrician' | 'Delivery Boy';
}

@Component({
  selector: 'app-member-info',
  templateUrl: './member-info.page.html',
  styleUrls: ['./member-info.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class MemberInfoPage implements OnInit {

  members: Member[] = [
    { name: 'John Doe', age: 28, location: 'New York', gender: 'male', service: 'Carpenter' },
    { name: 'Jane Smith', age: 25, location: 'Los Angeles', gender: 'female', service: 'Plumber' },
    { name: 'Mike Johnson', age: 35, location: 'Chicago', gender: 'male', service: 'Electrician' },
    { name: 'Alice Brown', age: 22, location: 'Houston', gender: 'female', service: 'Delivery Boy' },
  ];

  /* Filter + Search */
  isFilterOpen = false;
  searchText = '';

  locations: string[] = [];
  services: string[] = ['Carpenter', 'Plumber', 'Electrician', 'Delivery Boy'];
  genders: string[] = ['male', 'female'];

  selectedLocations: string[] = [];
  selectedServices: string[] = [];
  selectedGenders: string[] = [];

  filteredMembers: Member[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.filteredMembers = [...this.members];
    this.locations = [...new Set(this.members.map(m => m.location))];
  }

  provideService(member: Member) {
    this.router.navigate(['/service-booking',member])}

  getServiceIcon(service: string) {
    switch (service) {
      case 'Carpenter': return 'hammer-outline';
      case 'Plumber': return 'cog-outline';
      case 'Electrician': return 'flash-outline';
      case 'Delivery Boy': return 'bicycle-outline';
      default: return 'person-outline';
    }
  }

  /* Toggle chip selection */
  toggleSelection(type: 'location'|'service'|'gender', value: string) {
    let arr: string[];
    if(type === 'location') arr = this.selectedLocations;
    else if(type === 'service') arr = this.selectedServices;
    else arr = this.selectedGenders;

    const index = arr.indexOf(value);
    if(index > -1) arr.splice(index, 1);
    else arr.push(value);
  }

  /* Apply filter */
  applyFilter() {
    this.filteredMembers = this.members.filter(member => {
      const locMatch = this.selectedLocations.length ? this.selectedLocations.includes(member.location) : true;
      const svcMatch = this.selectedServices.length ? this.selectedServices.includes(member.service) : true;
      const genderMatch = this.selectedGenders.length ? this.selectedGenders.includes(member.gender) : true;
      const searchMatch = this.searchText
        ? member.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
          member.service.toLowerCase().includes(this.searchText.toLowerCase())
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
}
