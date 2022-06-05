import { EntityDataModuleConfig, EntityMetadataMap } from "@ngrx/data";
import { Post } from "./models/posts.model";

export const entityMetadata: EntityMetadataMap = {
    Post:{
        sortComparer: sortByName,
        entityDispatcherOptions:{
            optimisticUpdate: true // if true then update the data in store first and then call the API
            // optimisticDelete
        }
    }
}

export function sortByName(a: Post, b: Post): number {
    const compare = a.title.localeCompare(b.title);
    if (compare > 0) return -1;
    if (compare < 0) return 1;
  
    return compare;
}

export const entityConfig: EntityDataModuleConfig = {
    entityMetadata
}