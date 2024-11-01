import { Component, Input, OnInit } from '@angular/core';
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
  @Input() users: User[] = [];
  // @Output() groupCreated: EventEmitter = new EventEmitter();

  constructor(
    private auth: AuthService,
    private groupService: GroupService,
    public toast: ToastComponent
  ) {}

  ngOnInit(): void {
    if (!this.user._id) {
      this.user = this.auth.currentUser;
    }

    if (!this.group._id) {
      this.loadGroup();
    }
    console.log('#', this.group);
  }

  loadGroup(): void {
    this.groupService.getGroup(this.group).subscribe({
      next: (group) => {
        this.group = group;
        console.log('loaded groups', group);
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
            // this.groupCreated.emit('success');
            this.users.push(this.auth.currentUser);
            this.loadGroup();
            this.toast.setMessage('Successfully Joined Group', 'success');
          },
          error: (err) => {
            console.log('#', err);
            // this.groupCreated.emit('error');
            this.toast.setMessage('Failed to join group.', 'danger');
          },
        });
    } else {
      console.log('# User does not have id');
    }
  }
}
