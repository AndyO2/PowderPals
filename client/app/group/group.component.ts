import { Component, Input } from '@angular/core';
import { Group } from '../shared/models/group.model';
import { GroupService } from '../services/group.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrl: './group.component.scss',
})
export class GroupComponent {
  @Input() group: Group = new Group();

  constructor(private groupService: GroupService) {}  

  joinGroup(group: any) {
    // Implement the joinGroup logic here or call a service
    this.groupService.joinGroup(group).subscribe({
      next: (group) => (this.group = group),
      error: (error) => console.log(error),
    });
  }
}
