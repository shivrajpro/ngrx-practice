import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/models/posts.model';
import { AppState } from 'src/app/store/app.state';
import { updatePost } from '../state/posts.action';
import { getPostById } from '../state/posts.selectors';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit, OnDestroy {
  post:Post;
  postForm:FormGroup;
  postSub:Subscription;

  constructor(private route:ActivatedRoute, private store:Store<AppState>, private router: Router) { }

  ngOnInit(): void {
    // this.route.paramMap.subscribe((params)=>{
    //   const id = params.get('id') || '';
    //   this.postSub = this.store.select(getPostById(id)).subscribe((data)=>{
    //     // console.log("data",data);
    //     this.post = data as Post;

    //     this.createForm();
    //   })
    // })

    this.createForm();
    this.store.select(getPostById).subscribe((post)=>{
      if(post){
        this.post = post;

        this.postForm.patchValue({
          title: post.title,
          description: post.description
        })
      }
    })
  }

  createForm(){
    this.postForm = new FormGroup({
      title: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      description: new FormControl(null, [Validators.required, Validators.minLength(10)])
    })
  }

  onUpdatePost(){
    const post = {
      id: this.post.id,
      title:this.postForm.value.title,
      description: this.postForm.value.description
    }

    this.store.dispatch(updatePost({post}));
    this.postForm.reset();
    this.router.navigate(['posts']);
  }

  ngOnDestroy() {
    if(this.postSub) this.postSub.unsubscribe();
  }
}
