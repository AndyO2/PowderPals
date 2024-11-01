import { Component } from '@angular/core';
import { AuthService } from 'client/app/services/auth.service';
import { GroupService } from 'client/app/services/group.service';
import { Group } from 'client/app/shared/models/group.model';
import { ToastComponent } from 'client/app/shared/toast/toast.component';

@Component({
  selector: 'app-create-group-page',
  templateUrl: './create-group-page.component.html',
  styleUrl: './create-group-page.component.scss',
})
export class CreateGroupPageComponent {
  startDate: Date = new Date();
  endDate: Date = new Date();

  resortID = '';
  groups: Group[] = [];
  groupDescription = '';
  privacySetting = '';

  createGroupName = '';

  constructor(
    public toast: ToastComponent,
    private authService: AuthService,
    private groupService: GroupService
  ) {}
  createGroup() {
    this.groupService
      .addGroup({
        name: this.createGroupName,
        resortID: this.resortID,
        startDate: this.startDate,
        endDate: this.endDate,
        users: [this.authService.currentUser],
      } as Group)
      .subscribe({
        next: (group) => {
          this.groups.push(group);
          console.log('GROUP CREATED SUCCESSFULLY');
        },
        error: (error) => {
          console.log(error);
          console.log('GROUP FAILED TO CREATE SUCCESSFULLY');
        },
      });
  }
}
