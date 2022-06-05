import { EntityDataModuleConfig, EntityMetadataMap } from "@ngrx/data";

const entityMetadata: EntityMetadataMap = {
    Post:{
        entityDispatcherOptions:{
            optimisticUpdate: true
            // optimisticDelete
        }
    }
}

export const entityConfig: EntityDataModuleConfig = {
    entityMetadata
}