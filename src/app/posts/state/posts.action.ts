import { createAction, props } from "@ngrx/store";
import { Post } from "src/app/models/posts.model";

export const ADD_POST_ACTION = '[posts page] add Post';
export const UPDATE_POST_ACTION = '[posts page] update Post';

export const addPost = createAction(ADD_POST_ACTION, props<{post:Post}>());
export const updatePost = createAction(UPDATE_POST_ACTION, props<{post: Post}>());