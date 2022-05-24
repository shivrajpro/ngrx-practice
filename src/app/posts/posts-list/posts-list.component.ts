import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Post } from 'src/app/models/posts.model';
import { AppState } from 'src/app/store/app.state';
import { deletePost, loadPosts } from '../state/posts.action';
import { getPosts } from '../state/posts.selectors';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss']
})
export class PostsListComponent implements OnInit {
  posts:Observable<Post[]>;

  constructor(private store:Store<AppState>) {
    this.store.dispatch(loadPosts());
    this.posts = this.store.select(getPosts);
   }

  ngOnInit(): void {
  }

  onDeletePost(id:any){
    this.store.dispatch(deletePost({id}));
  }

}
