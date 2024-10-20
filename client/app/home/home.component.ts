import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  resorts = [
    { name: 'Brighton Ski Resort', description: 'Description 1', image: '../../assets/download.jpeg' },
    { name: 'Alta Ski Resort', description: 'Description 1', image: '../../assets/download.jpeg' },
    { name: 'Snowbird Ski Resort', description: 'Description 1', image: '../../assets/download.jpeg' },
    { name: 'Deer Valley Ski Resort', description: 'Description 1', image: '../../assets/download.jpeg' },
    { name: 'Solitude Ski Resort', description: 'Description 1', image: '../../assets/download.jpeg' },
    { name: 'Brighton Ski Resort', description: 'Description 1', image: '../../assets/download.jpeg' },
    { name: 'Brighton Ski Resort', description: 'Description 1', image: '../../assets/download.jpeg' },
    { name: 'Brighton Ski Resort', description: 'Description 1', image: '../../assets/download.jpeg' },
  ];
}
