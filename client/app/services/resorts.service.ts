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

  getResorts(): Observable<Resort[]> {
    return this.http.get<Resort[]>('/api/resorts');
  }

  updateResort(resort: Resort): Observable<Resort> {
    return this.http.put<Resort>(`/api/resort/${resort._id}`, resort);
  }

  deleteResort(resort: Resort): Observable<Resort> {
    return this.http.delete<Resort>(`/api/resort/${resort._id}`);
  }

  filterResorts(filters: {
    name?: string;
    city?: string;
    state?: string;
    country?: string;
    rating?: number;
  }): Observable<Resort[]> {
    const params = new URLSearchParams();
    if (filters.name) params.append('name', filters.name);
    if (filters.city) params.append('city', filters.city);
    if (filters.state) params.append('state', filters.state);
    if (filters.country) params.append('country', filters.country);
    if (filters.rating !== undefined)
      params.append('rating', filters.rating.toString());

    return this.http.get<Resort[]>(`/api/resorts?${params.toString()}`);
  }
}
