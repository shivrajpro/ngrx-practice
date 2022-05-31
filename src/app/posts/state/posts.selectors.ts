import { createFeatureSelector, createSelector } from "@ngrx/store";
import { RouterStateUrl } from "src/app/store/router/custom.serializer";
import { getCurrentRoute } from "src/app/store/router/router.selector";
import { postAdapter, PostsState } from "./posts.state";

export const POSTS_STATE_NAME = 'posts';

const getPostState = createFeatureSelector<PostsState>('posts');
export const postsSelector = postAdapter.getSelectors();
export const getPosts = createSelector(getPostState, postsSelector.selectAll);
export const getPostEntities = createSelector(getPostState, postsSelector.selectEntities);

export const getPostById = createSelector(getPostEntities, getCurrentRoute,
    (posts, route: RouterStateUrl) => {
        // return posts ? posts.find((post) => post.id === route.params['id']) : null;
        return posts ? posts[route.params['id']] : null;
    }
)