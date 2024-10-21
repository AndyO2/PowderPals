import { ChangeDetectorRef, Component } from '@angular/core';
import { AuthService } from 'client/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  constructor(public auth: AuthService,
    private changeDetector: ChangeDetectorRef) { }
}
