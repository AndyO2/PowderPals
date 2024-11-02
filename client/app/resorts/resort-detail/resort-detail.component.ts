import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastComponent } from 'client/app/shared/toast/toast.component';
import { Group } from 'client/app/shared/models/group.model';
import { AuthService } from 'client/app/services/auth.service';
import { User } from 'client/app/shared/models/user.model';
import { UserService } from 'client/app/services/user.service';
import { GroupService } from 'client/app/services/group.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateGroupPageComponent } from 'client/app/group/create-group-page/create-group-page.component';

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
    private activatedRoute: ActivatedRoute,
    public matDialog: MatDialog
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
    });
  }

  getGroupsForResortID(resortID: string) {
    this.groupService.getGroupsForResort(resortID).subscribe((groups) => {
      console.log('# getGroupsForResortID', groups);
      this.groups = groups;
      this.isLoading = false;
    });
  }

  onCreateGroupClicked(): void {
    this.matDialog
      .open(CreateGroupPageComponent, {
        // height: 'calc(100% - 30px)',
        // width: 'calc(100% - 30px)',
        maxWidth: '100vw',
        maxHeight: '100vh',
        panelClass: 'full-height-dialog',
        data: {
          resortID: this.resortID,
        },
      })
      .afterClosed()
      .subscribe((out) => {
        this.getGroupsForResortID(this.resortID);
        console.log(out);
      });
  }
}
