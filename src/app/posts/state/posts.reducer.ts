import { createReducer, on } from "@ngrx/store";
import { addPostSuccess, deletePost, deletePostSuccess, loadPostsSuccess, updatePost, updatePostSuccess } from "./posts.action";
import { initialState, postAdapter } from "./posts.state";

const _postsReducer = createReducer(initialState,
    on(addPostSuccess, (state, action) => {
        return postAdapter.addOne(action.post, {...state, count: state.count + 1});
        // const post = { ...action.post };
        // post.id = (state.posts.length + 1).toString();

        // return {
        //     ...state,
        //     posts: [...state.posts, post]
        // }
    }),
    on(updatePostSuccess, (state, action) => {
        return postAdapter.updateOne(action.post, state);
        // const updatePosts = state.posts.map((post) => {
        //     if (post.id === action.post.id) return action.post;
        //     return post;
        // })
        // console.log("updatedposts",updatePosts);
        // return {
        //     ...state,
        //     posts: updatePosts
        // }
    }),
    on(deletePostSuccess, (state, action)=>{
        return postAdapter.removeOne(action.id, state);

        // const newPostsList = state.posts.filter((post)=> post.id != action.id);

        // return {
        //     ...state,
        //     posts:newPostsList
        // }
    }),
    on(loadPostsSuccess, (state, action)=>{
        return postAdapter.setAll(action.posts, {
            ...state,
            count: state.count + 1
        });
        // return {
        //     ...state,
        //     posts: action.posts
        // }
    })

);

export function postsReducer(state: any, action: any) {
    return _postsReducer(state, action);
}