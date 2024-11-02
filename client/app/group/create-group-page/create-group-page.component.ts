import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'client/app/services/auth.service';
import { GroupService } from 'client/app/services/group.service';
import { Group } from 'client/app/shared/models/group.model';
import { ToastComponent } from 'client/app/shared/toast/toast.component';

@Component({
  selector: 'app-create-group-page',
  templateUrl: './create-group-page.component.html',
  styleUrl: './create-group-page.component.scss',
})
export class CreateGroupPageComponent implements OnInit {
  resortID = '';
  createGroupName = '';
  groupDescription = '';
  startDate: Date = new Date();
  endDate: Date = new Date();
  privacySetting = 'public';

  constructor(
    public toast: ToastComponent,
    private authService: AuthService,
    private groupService: GroupService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['resortID']) {
        this.resortID = params['resortID'];
      }
    });
  }

  createGroup() {
    this.groupService
      .addGroup({
        name: this.createGroupName,
        resortID: this.resortID,
        startDate: this.startDate,
        endDate: this.endDate,
        users: [this.authService.currentUser],
        description: this.groupDescription,
        privacy: this.privacySetting,
      } as Group)
      .subscribe({
        next: () => {
          this.toast.setMessage('Group Created Successfully', 'success');
          this.router.navigate(['/resort', this.resortID]);
        },
        error: (error) => {
          console.log(error);
          this.toast.setMessage('Something went wrong.', 'danger');
        },
      });
  }
}
