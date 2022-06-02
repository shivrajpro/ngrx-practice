import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { first, Observable, tap } from "rxjs";
import { PostService } from "./posts.service";

@Injectable()
export class PostsResolver implements Resolve<boolean>{
    constructor(private postsService: PostService){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        // throw new Error("Method not implemented.");
        return this.postsService.loaded$.pipe(
            tap((loaded)=>{
                if(!loaded) this.postsService.getAll();
            }),
            first()
        )
    }

}