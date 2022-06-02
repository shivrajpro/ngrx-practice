import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';
import { map, Observable } from 'rxjs';
import { Post } from '../models/posts.model';

@Injectable()
export class PostDataService extends DefaultDataService<Post> {
  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
    super('Post', http, httpUrlGenerator);
  }

  override getAll(): Observable<Post[]> {
    return this.http
      .get(`https://jsonplaceholder.typicode.com/posts`)
      .pipe(
        map((data) => {
          const posts: Post[] = [];
          for (const key in data) posts.push({ ...data[key], description:data[key].body, id: key });
          return posts;
        })
      );
  }
}
