export interface labelSize {
    height : number,
    width : number,
    fontSize : number,
}
export interface labelWidthChanged {
    labelText : string,
    oldLabelText : string,
    width : number,
}
export interface labelServerRes {
    id : number,
    labelText : string,
    taskId : number,
}