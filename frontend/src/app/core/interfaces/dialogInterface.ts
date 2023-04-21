import { labelServerRes} from "./labelInterface";

export interface PassDataToDialog {
    taskId : number,
    taskTitle : string,
    taskDescription : string,
    taskDeadlineTime : string,
    taskSpotInBucket : number,
    bucketId : number,
    currentBucketColor : string,
    labels : labelServerRes[]
}
export interface EditMode {
    modeName : string,
    isActive : boolean,
}