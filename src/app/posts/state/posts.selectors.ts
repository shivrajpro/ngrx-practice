import { createFeatureSelector, createSelector } from "@ngrx/store";
import { PostsState } from "./posts.state";

const getPostState = createFeatureSelector<PostsState>('posts');

export const getPosts = createSelector(getPostState, (state) => {
    return state.posts;
})

export const getPostById = (postId: string) => createSelector(getPostState, (state) => {
    return state.posts.find((post) => post.id === postId);
})