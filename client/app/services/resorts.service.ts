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

  getGoogleResortInfo(query: string): Observable<any> {
    // https://places.googleapis.com/v1/places:BrightonResort
    console.log(query);
    return this.http.get(
      `https://maps.googleapis.com/maps/api/js?key=${'AIzaSyAHQPMzTNCRSYzf0V3tW8KnfqSeq151WIQ'}&loading=async&libraries=places&callback=initMap"`
    );
  }
}
