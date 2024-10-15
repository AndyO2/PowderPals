import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Post } from '../shared/models/post.model';

@Injectable()
export class PostService {

  constructor(private http: HttpClient) { }

  getCats(): Observable<Post[]> {
    return this.http.get<Post[]>('/api/posts');
  }

  countCats(): Observable<number> {
    return this.http.get<number>('/api/posts/count');
  }

  addCat(post: Post): Observable<Post> {
    return this.http.post<Post>('/api/post', post);
  }

  getCat(post: Post): Observable<Post> {
    return this.http.get<Post>(`/api/post/${post._id}`);
  }

  editCat(post: Post): Observable<string> {
    return this.http.put(`/api/post/${post._id}`, post, { responseType: 'text' });
  }

  deleteCat(post: Post): Observable<string> {
    return this.http.delete(`/api/post/${post._id}`, { responseType: 'text' });
  }

}
