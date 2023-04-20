export interface taskServerRes {
    taskId  : number,
    taskTitle : string,
    taskDescription : string | null,
    taskDeadlineTime : string,
    taskSpotInBucket : number,
    bucketId : number
}