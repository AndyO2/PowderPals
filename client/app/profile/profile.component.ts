import { Component, OnInit } from '@angular/core';
import { User } from '../shared/models/user.model';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  user: User = new User();
  isLoading = true;

  constructor(private auth: AuthService, private userService: UserService) {}

  ngOnInit(): void {
    this.getUser();
  }

  private getUser() {
    this.userService.getUser(this.auth.currentUser).subscribe({
      next: (user) => (this.user = user),
      error: (error) => console.log(error),
      complete: () => (this.isLoading = false),
    });
  }
}
