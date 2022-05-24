import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Post } from '../models/posts.model';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  readonly postsDataUrl = `https://ngrx-practice-b655e-default-rtdb.firebaseio.com/posts.json`;

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

  addPost(post:Post): Observable<{name: string}>{
    return this.http.post<{name: string}>(this.postsDataUrl, post);
  }

  updatePost(post:Post){
    const postData = {
      [post.id]:{title: post.title, description: post.description}
    }
    return this.http.patch(this.postsDataUrl, postData);
  }

  deletePost(id: string){
    return this.http.delete(`https://ngrx-practice-b655e-default-rtdb.firebaseio.com/posts/${id}.json`);
  }
}
