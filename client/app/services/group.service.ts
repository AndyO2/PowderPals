import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Group } from '../shared/models/group.model';

@Injectable()
export class GroupService {
  constructor(private http: HttpClient) {}

  getGroups(): Observable<Group[]> {
    return this.http.get<Group[]>('/api/groups');
  }

  countGroups(): Observable<number> {
    return this.http.get<number>('/api/groups/count');
  }

  addGroup(group: Group): Observable<Group> {
    return this.http.post<Group>('/api/group', group);
  }

  getGroup(group: Group): Observable<Group> {
    return this.http.get<Group>(`/api/group/${group._id}`);
  }

  editGroup(group: Group): Observable<string> {
    return this.http.put(`/api/group/${group._id}`, group, {
      responseType: 'text',
    });
  }

  deleteGroup(group: Group): Observable<string> {
    return this.http.delete(`/api/group/${group._id}`, {
      responseType: 'text',
    });
  }

  // Custom
  getGroupsForResort(
    resortID: string,
    startingFromDate: Date | undefined
  ): Observable<Group[]> {
    let params = {};

    if (startingFromDate) {
      params = {
        startingFromDate: startingFromDate.toISOString(),
      };
    }

    console.log('#query parmas', params);

    return this.http.get<Group[]>(`/api/groups/resort/${resortID}`, {
      params,
    });
  }

  joinGroup(group: string, userID: string): Observable<Group> {
    return this.http.put<Group>(`/api/groups/${group}/join`, {
      userID,
    });
  }
}
