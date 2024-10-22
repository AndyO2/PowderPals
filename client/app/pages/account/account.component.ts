import { Component, OnInit } from '@angular/core';
import { AuthService } from 'client/app/services/auth.service';
import { UserService } from 'client/app/services/user.service';
import { User } from 'client/app/shared/models/user.model';
import { ToastComponent } from 'client/app/shared/toast/toast.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss',
})
export class AccountComponent implements OnInit {
  user: User = new User();
  isLoading = true;
  url: any = '';

  constructor(
    public auth: AuthService,
    public toast: ToastComponent,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    this.userService.getUser(this.auth.currentUser).subscribe({
      next: (data) => (this.user = data),
      error: (error) => console.log(error),
      complete: () => (this.isLoading = false),
    });
  }

  save(user: User): void {
    this.userService.editUser(user).subscribe({
      next: () => {
        this.toast.setMessage('Account settings saved!', 'success');
        this.auth.currentUser = user;
        this.auth.isAdmin = user.role === 'admin';
      },
      error: (error) => console.log(error),
    });
  }

  onSelectFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => {
        // called once readAsDataURL is completed
        this.url = event?.target?.result;
        console.log(this.url);
      };
    }
  }
  public delete() {
    this.url = null;
  }
}
