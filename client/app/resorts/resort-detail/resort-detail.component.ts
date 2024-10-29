import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResortsService } from 'client/app/services/resorts.service';
import { Resort } from 'client/app/shared/models/resort.model';
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
  resortId: string | undefined;
  resort: Resort = new Resort();
  groups: Group[] = [];

  startDate: Date = new Date();
  endDate: Date = new Date();

  createGroupName = '';

  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private resortsService: ResortsService,
    public toast: ToastComponent,
    public auth: AuthService,
    private userService: UserService,
    private groupService: GroupService
  ) {}

  ngOnInit(): void {
    this.getUser();

    this.route.params.subscribe((params) => {
      this.resortId = params['id'];
      this.getResort();
    });
  }

  getUser(): void {
    this.userService.getUser(this.auth.currentUser).subscribe({
      next: (data) => (this.user = data),
      error: (error) => console.log(error),
      complete: () => (this.isLoading = false),
    });
  }

  getResort() {
    this.resortsService.getResort({ _id: this.resortId || '' }).subscribe({
      next: (resort) => (this.resort = resort),
      error: (error) => console.log(error),
      complete: () => (this.isLoading = false),
    });
  }

  createGroup() {
    this.groupService
      .addGroup({
        name: this.createGroupName,
        resort: this.resort,
        startDate: this.startDate,
        endDate: this.endDate,
      } as Group)
      .subscribe({
        next: (group) => (this.groups = [...this.groups, group]),
        error: (error) => console.log(error),
      });
  }

  joinGroup(group: Group) {
    console.log('# joinGroup', group);
    // TODO: implement group service
    this.groupService.joinGroup(group, this.user).subscribe({
      next: (group) => (this.groups = [...this.groups, group]),
      error: (error) => console.log(error),
    });
  }
}
