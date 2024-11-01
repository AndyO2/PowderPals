import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastComponent } from 'client/app/shared/toast/toast.component';
import { Group } from 'client/app/shared/models/group.model';
import { AuthService } from 'client/app/services/auth.service';
import { User } from 'client/app/shared/models/user.model';
import { UserService } from 'client/app/services/user.service';
import { GroupService } from 'client/app/services/group.service';

@Component({
  selector: 'app-resort-detail',
  templateUrl: './resort-detail.component.html',
  styleUrl: './resort-detail.component.scss',
})
export class ResortDetailComponent implements OnInit {
  user: User = new User();
  resortID = '';
  groups: Group[] = [];

  isLoading = true;

  constructor(
    public toast: ToastComponent,
    public auth: AuthService,
    private userService: UserService,
    private groupService: GroupService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.resortID = params['id'];
        this.getGroupsForResortID(this.resortID);
      }
    });
  }

  getUser(): void {
    this.userService.getUser(this.auth.currentUser).subscribe({
      next: (data) => (this.user = data),
      error: (error) => console.log(error),
      complete: () => (this.isLoading = false),
    });
  }

  getGroupsForResortID(resortID: string) {
    this.groupService.getGroupsForResort(resortID).subscribe((groups) => {
      console.log('# getGroupsForResortID', groups);
      this.groups = groups;
    });
  }
}
