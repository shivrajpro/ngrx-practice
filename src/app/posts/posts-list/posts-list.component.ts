import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Post } from 'src/app/models/posts.model';
import { AppState } from 'src/app/store/app.state';
import { PostService } from '../posts.service';
import { deletePost, loadPosts } from '../state/posts.action';
import { getCount, getPosts } from '../state/posts.selectors';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss']
})
export class PostsListComponent implements OnInit {
  posts:Observable<Post[]>;
  count: Observable<number>;

  constructor(private postService:PostService) {
    // this.store.dispatch(loadPosts());
    // this.posts = this.store.select(getPosts);
    // this.count = this.store.select(getCount);
    
    
    // this.posts = this.postService.getAll();
    this.posts = this.postService.entities$;
  }

  ngOnInit(): void {
  }

  onDeletePost(event:Event, id:string){
    // this.store.dispatch(deletePost({id}));
    this.postService.delete(id);
  }

}
