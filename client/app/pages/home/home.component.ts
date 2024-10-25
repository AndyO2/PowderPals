import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ResortsService } from 'client/app/services/resorts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(
    private resortsService: ResortsService,
    private matDialog: MatDialog
  ) {}

  addResort() {
    // TODO: Implement resort api to add a resort
  }

  filterByContinent(value: Event) {
    // TODO: Implement resort api to filter by continent
    console.log(value);
  }
  filterByCountry(value: Event) {
    // TODO: Implement resort api to filter by country
    console.log(value);
  }

  filterByCity(value: Event) {
    // TODO: Implement resort api to filter by city
    console.log(value);
  }

  isChecked = false;

  resorts = [
    {
      name: 'Brighton Ski Resort',
      description: 'Description 1',
      image: '../../assets/download.jpeg',
    },
    {
      name: 'Alta Ski Resort',
      description: 'Description 1',
      image: '../../assets/download.jpeg',
    },
    {
      name: 'Snowbird Ski Resort',
      description: 'Description 1',
      image: '../../assets/download.jpeg',
    },
    {
      name: 'Deer Valley Ski Resort',
      description: 'Description 1',
      image: '../../assets/download.jpeg',
    },
    {
      name: 'Solitude Ski Resort',
      description: 'Description 1',
      image: '../../assets/download.jpeg',
    },
    {
      name: 'Brighton Ski Resort',
      description: 'Description 1',
      image: '../../assets/download.jpeg',
    },
    {
      name: 'Brighton Ski Resort',
      description: 'Description 1',
      image: '../../assets/download.jpeg',
    },
    {
      name: 'Brighton Ski Resort',
      description: 'Description 1',
      image: '../../assets/download.jpeg',
    },
  ];
}
