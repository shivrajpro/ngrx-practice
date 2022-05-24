import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, mergeMap } from "rxjs";
import { PostsService } from "../posts.service";
import { loadPosts, loadPostsSuccess } from "./posts.action";

@Injectable()
export class PostsEffects{
    constructor(private action$: Actions, private postsService: PostsService){}

    loadPosts$ = createEffect(
        ()=>{
        return this.action$.pipe(
            ofType(loadPosts),
            mergeMap((action)=>{
                return this.postsService.getPosts()
                .pipe(
                    map((posts)=>{
                        return loadPostsSuccess({posts})
                    })
                )
            })
        )
    }
    // {dispatch:false}
    )
}