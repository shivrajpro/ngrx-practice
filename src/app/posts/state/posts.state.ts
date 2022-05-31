import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Post } from 'src/app/models/posts.model';

// export interface PostsState{
//     posts:Post[];
// }

// export const initialState:PostsState = {
//     posts: [
//         {id:'1', title:'sample title 1', description: 'sample description 1'},
//         {id:'2', title:'sample title 2', description: 'sample description 2'}
//     ]
// }

// export const initialState:PostsState = {
//     posts: null
// }

export interface PostsState extends EntityState<Post> {
  count: number;
}
export const postAdapter = createEntityAdapter<Post>({
    sortComparer: sortByName
});
export const initialState: PostsState = postAdapter.getInitialState({
  count: 0,
});

export function sortByName(a: Post, b: Post): number {
  const compare = a.title.localeCompare(b.title);
  if (compare > 0) return 1;
  if (compare < 0) return -1;

  return compare;
}
