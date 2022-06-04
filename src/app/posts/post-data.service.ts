import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';
import { Update } from '@ngrx/entity';
import { map, Observable } from 'rxjs';
import { Post } from '../models/posts.model';

@Injectable()
export class PostDataService extends DefaultDataService<Post> {
  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
    super('Post', http, httpUrlGenerator);
  }

  override getAll(): Observable<Post[]> {
    return this.http
      .get(`https://ngrx-practice-b655e-default-rtdb.firebaseio.com/posts.json`)
      .pipe(
        map((data) => {
          const posts: Post[] = [];
          for (const key in data) posts.push({ ...data[key], id: key });
          return posts;
        })
      );
  }

  override add(post: Post): Observable<Post> {
    return this.http
      .post<{ name: string }>(
        `https://ngrx-practice-b655e-default-rtdb.firebaseio.com/posts.json`,
        post
      )
      .pipe(
        map((data) => {
          return { ...post, id: data.name };
        })
      );
  }

  override update(post: Update<Post>): Observable<Post> {
    return this.http.put<Post>(
      `https://ngrx-practice-b655e-default-rtdb.firebaseio.com/posts/${post.id}.json`,
      { ...post.changes }
    );
  }

  override delete(id: string): Observable<string> {
    return this.http
      .delete(
        `https://ngrx-practice-b655e-default-rtdb.firebaseio.com/${id}.json`
      )
      .pipe(
        map((data) => {
          return id;
        })
      );
  }
}
