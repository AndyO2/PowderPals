import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
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
  createGroupName = '';
  groupDescription = '';
  startDate: Date = new Date();
  endDate: Date = new Date();
  privacySetting = 'public';

  constructor(
    public toast: ToastComponent,
    private authService: AuthService,
    private groupService: GroupService,
    public dialogRef: MatDialogRef<CreateGroupPageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { resortID: string }
  ) {}

  createGroup() {
    this.groupService
      .addGroup({
        name: this.createGroupName,
        resortID: this.data.resortID,
        startDate: this.startDate,
        endDate: this.endDate,
        users: [this.authService.currentUser],
        description: this.groupDescription,
        privacy: this.privacySetting,
      } as Group)
      .subscribe({
        next: () => {
          this.toast.setMessage('Group Created Successfully', 'success');
          this.dialogRef.close('success');
        },
        error: (error) => {
          console.log(error);
          this.toast.setMessage('Something went wrong.', 'danger');
          this.dialogRef.close('success');
        },
      });
  }
}
