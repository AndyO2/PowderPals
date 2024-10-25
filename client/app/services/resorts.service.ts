import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Resort } from '../shared/models/resort.model';
import { Observable } from 'rxjs';

@Injectable()
export class ResortsService {
  constructor(private http: HttpClient) {}

  addResort(resort: Resort): Observable<Resort> {
    return this.http.post<Resort>('/api/resort', resort);
  }

  getResort(resort: Resort): Observable<Resort> {
    return this.http.get<Resort>(`/api/resort/${resort._id}`);
  }
}
