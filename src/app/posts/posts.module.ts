import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AddPostComponent } from './add-post/add-post.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { PostsListComponent } from './posts-list/posts-list.component';
// import { PostsEffects } from './state/posts.effects';
import { postsReducer } from './state/posts.reducer';
import { POSTS_STATE_NAME } from './state/posts.selectors';
import { SinglePostComponent } from './single-post/single-post.component';
import { HttpClientModule } from '@angular/common/http';
import { PostDataService } from './post-data.service';
import { EntityDataService } from '@ngrx/data';
import { PostsResolver } from './posts.resolver';

const routes: Routes = [
  {
    path: '',
    component: PostsListComponent,
    resolve:{posts: PostsResolver},
    children: [
      { path: 'add', component: AddPostComponent },
      { path: 'edit/:id', component: EditPostComponent }
    ],
  }
];
@NgModule({
  declarations: [
    PostsListComponent,
    AddPostComponent,
    EditPostComponent,
    SinglePostComponent
  ],
  imports: [
    CommonModule, 
    FormsModule, 
    ReactiveFormsModule, 
    HttpClientModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(POSTS_STATE_NAME, postsReducer),
    // EffectsModule.forFeature([PostsEffects])
  ],
  providers: [PostDataService, PostsResolver]
})
export class PostsModule {
  constructor(entityDataService: EntityDataService, postDataService: PostDataService){
    entityDataService.registerService('Post',postDataService);
  }
}
