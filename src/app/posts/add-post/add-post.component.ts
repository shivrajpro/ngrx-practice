import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Post } from 'src/app/models/posts.model';
import { AppState } from 'src/app/store/app.state';
import { PostService } from '../posts.service';
import { addPost } from '../state/posts.action';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {
  postForm: FormGroup;

  constructor(private store: Store<AppState>, 
    private postService: PostService, private router: Router) {
    this.postForm = new FormGroup({
      title: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      description: new FormControl(null, [Validators.required, Validators.minLength(10)])
    })
  }

  ngOnInit(): void {
  }

  onSavePost() {
    // console.log(this.postForm);

    // const post: Post = {
    //   title: this.postForm.value.title,
    //   description: this.postForm.value.description
    // }
    // this.store.dispatch(addPost({ post }));
    // addPost will be there in ofType in effects
    // this.postForm.reset();


    // using NgRx Data
    const post:Post = this.postForm.value;
    this.postService.add(post);
    this.postForm.reset();
    this.router.navigate(['/post']);
  }
}
