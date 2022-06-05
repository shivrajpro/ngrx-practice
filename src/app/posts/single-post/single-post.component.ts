import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Post } from 'src/app/models/posts.model';
import { AppState } from 'src/app/store/app.state';
import { PostService } from '../posts.service';
import { getPostById } from '../state/posts.selectors';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss']
})
export class SinglePostComponent implements OnInit {
  // post: Observable<Post>;
  post:Post;
  constructor(private store: Store<AppState>, private postsService: PostService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // this.post = this.store.select(getPostById);
   const id = this.route.snapshot.params['id'];
    this.postsService.entities$.subscribe(posts=>{
      const post = posts.find(post=> post.id == id);
      this.post = post;
    })    
  }

}
