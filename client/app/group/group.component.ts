import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Group } from '../shared/models/group.model';
import { GroupService } from '../services/group.service';
import { User } from '../shared/models/user.model';
import { ToastComponent } from '../shared/toast/toast.component';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrl: './group.component.scss',
})
export class GroupComponent implements OnInit {
  @Input() group: Group = new Group();
  @Input() user: User = new User();
  // @Output() groupCreated: EventEmitter = new EventEmitter();

  @Output() deleteGroupClicked: EventEmitter<string> =
    new EventEmitter<string>();

  numUsersInGroup = 0;

  constructor(
    public auth: AuthService,
    private groupService: GroupService,
    public toast: ToastComponent
  ) {}

  ngOnInit(): void {
    if (!this.user._id) {
      this.user = this.auth.currentUser;
    }

    if (!this.group._id) {
      this.loadGroup();
    } else {
      this.numUsersInGroup = this.group.members?.length || 0;
    }
  }

  loadGroup(): void {
    this.groupService.getGroup(this.group).subscribe({
      next: (group) => {
        this.group = group;
        this.numUsersInGroup = group.members?.length || 0;
        console.log('# numUsersInGroup', this.numUsersInGroup);
      },
      error: (error) => console.log(error),
    });
  }

  joinGroup(): void {
    if (this.user._id) {
      this.groupService
        .joinGroup(this.group._id || '', this.user._id || '')
        .subscribe({
          next: () => {
            this.loadGroup();
            this.toast.setMessage('Successfully Joined Group!', 'success');
          },
          error: (err) => {
            this.toast.setMessage(err.error.message, 'danger');
          },
        });
    } else {
      console.log('# User does not have id');
    }
  }

  deleteGroup(group: any): void {
    this.groupService.deleteGroup(group).subscribe({
      next: () => {
        console.log('# GROUP DELETED');
        this.deleteGroupClicked.emit('success');
      },
      error: () => {
        this.deleteGroupClicked.emit('failure');
        console.log('# GROUP FAILED TO DELETE');
      },
    });
  }
}
