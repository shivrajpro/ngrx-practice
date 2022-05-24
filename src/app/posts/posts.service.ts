import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Post } from '../models/posts.model';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    return this.http
      .get<Post[]>(
        `https://ngrx-practice-b655e-default-rtdb.firebaseio.com/posts.json`
      )
      .pipe(
        map((data) => {
          const posts: Post[] = [];
          for (const key in data) {
            posts.push({
              id: key,
              ...data[key]
            });
          }
          return posts;
        })
      );
  }
}
