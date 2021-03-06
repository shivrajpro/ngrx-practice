import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { Post } from 'src/app/models/posts.model';

export const ADD_POST_ACTION = '[posts page] add Post';
export const ADD_POST_SUCCESS = '[posts page] add posts success';
export const UPDATE_POST_ACTION = '[posts page] update Post';
export const UPDATE_POST_SUCCESS = '[posts page] update posts success';
export const DELETE_POST_ACTION = '[posts page] delete Post';
export const DELETE_POST_SUCCESS = '[posts page] delete post success';
export const LOAD_POSTS = '[auth page] load Posts';
export const LOAD_POSTS_SUCCESS = '[auth page] load posts success';

export const addPost = createAction(ADD_POST_ACTION, props<{ post: Post }>());
export const addPostSuccess = createAction(ADD_POST_SUCCESS, props<{post: Post}>());
export const updatePost = createAction(
  UPDATE_POST_ACTION,
  props<{ post: Post }>()
);
export const updatePostSuccess = createAction(UPDATE_POST_SUCCESS, props<{post: Update<Post>}>());
export const deletePost = createAction(
  DELETE_POST_ACTION,
  props<{ id: string }>()
);
export const deletePostSuccess = createAction(DELETE_POST_SUCCESS, props<{id:string}>());
export const loadPosts = createAction(LOAD_POSTS);
export const loadPostsSuccess = createAction(
  LOAD_POSTS_SUCCESS,
  props<{ posts: Post[] }>()
);
export const dummyAction = createAction('dummy action');