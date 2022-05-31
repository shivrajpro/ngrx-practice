import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Update } from '@ngrx/entity';
import { RouterNavigatedAction, ROUTER_NAVIGATION } from '@ngrx/router-store';
import { Store } from '@ngrx/store';
import { filter, map, mergeMap, of, switchMap, withLatestFrom } from 'rxjs';
import { Post } from 'src/app/models/posts.model';
import { AppState } from 'src/app/store/app.state';
import { PostsService } from '../posts.service';
import {
  addPost,
  addPostSuccess,
  deletePost,
  deletePostSuccess,
  dummyAction,
  loadPosts,
  loadPostsSuccess,
  updatePost,
  updatePostSuccess,
} from './posts.action';
import { getPosts } from './posts.selectors';

@Injectable()
export class PostsEffects {
  constructor(private action$: Actions, private postsService: PostsService, private store: Store<AppState>) {}

  loadPosts$ = createEffect(
    () => {
      return this.action$.pipe(
        ofType(loadPosts),
        withLatestFrom(this.store.select(getPosts)),
        mergeMap(([action, posts]) => {
          if(!posts.length){
            return this.postsService.getPosts().pipe(
              map((posts) => {
                return loadPostsSuccess({ posts });
              })
            );
          }
          return of(dummyAction());
        })
      );
    }
    // {dispatch:false}
  );

  addPost$ = createEffect(() => {
    return this.action$.pipe(
      ofType(addPost),
      mergeMap((action) => {
        return this.postsService.addPost(action.post).pipe(
          map((data) => {
            // console.log('data', data); 
            const post = { ...action.post, id: data.name };
            return addPostSuccess({ post });
          })
        );
      })
    );
  });

  updatePost$ = createEffect(() => {
    return this.action$.pipe(
      ofType(updatePost),
      switchMap((action) => {
        return this.postsService.updatePost(action.post).pipe(
          map((data) => {
            // console.log("data",data);
            const updatedPost: Update<Post> = {
              id: action.post.id,
              changes:{
                ...action.post
              }
            }
            return updatePostSuccess({ post: updatedPost });
          })
        );
      })
    );
  });

  deletePost$ = createEffect(() => {
    return this.action$.pipe(
      ofType(deletePost),
      switchMap((action) => {
        return this.postsService.deletePost(action.id).pipe(
          map((data) => {
            return deletePostSuccess({ id: action.id });
          })
        );
      })
    );
  });

  getSinglePost$ = createEffect(()=>{
    return this.action$.pipe(
      ofType(ROUTER_NAVIGATION),
      filter((r: RouterNavigatedAction)=>{
        return r.payload.routerState.url.startsWith('/posts/details');
      }),
      map((r: RouterNavigatedAction)=>{
        return r.payload.routerState['params']['id'];
      }),
      withLatestFrom(this.store.select(getPosts)),
      switchMap(([id, posts])=>{
        if(!posts.length){
          return this.postsService.getPostById(id).pipe(
            map((post)=>{
              const postData = [{...post, id}];
              return loadPostsSuccess({posts: postData});
            })
          )
        }
        return of(dummyAction());
      })
    )
  })
}
