import { Component, Input, OnInit } from '@angular/core';
import { Group } from '../shared/models/group.model';
import { GroupService } from '../services/group.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrl: './group.component.scss',
})
export class GroupComponent implements OnInit {
  @Input() group: Group = new Group();

  constructor(private groupService: GroupService) {}

  ngOnInit(): void {
    this.groupService.getGroup(this.group).subscribe({
      next: (group) => (this.group = group),
      error: (error) => console.log(error),
    });
  }
}
