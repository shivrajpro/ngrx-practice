import { createReducer, on } from "@ngrx/store";
import { addPostSuccess, deletePost, loadPostsSuccess, updatePost } from "./posts.action";
import { initialState } from "./posts.state";

const _postsReducer = createReducer(initialState,
    on(addPostSuccess, (state, action) => {
        const post = { ...action.post };
        // post.id = (state.posts.length + 1).toString();

        return {
            ...state,
            posts: [...state.posts, post]
        }
    }),
    on(updatePost, (state, action)=>{
        const updatePosts = state.posts.map((post)=>{
            if (post.id === action.post.id) return action.post;
            return post;
        })
        console.log("updatedposts",updatePosts);
        return {
            ...state,
            posts:updatePosts
        }
    }),
    on(deletePost, (state, action)=>{
        const newPostsList = state.posts.filter((post)=> post.id != action.id);

        return {
            ...state,
            posts:newPostsList
        }
    }),
    on(loadPostsSuccess, (state, action)=>{
        return {
            ...state,
            posts: action.posts
        }
    })

);

export function postsReducer(state: any, action: any) {
    return _postsReducer(state, action);
}