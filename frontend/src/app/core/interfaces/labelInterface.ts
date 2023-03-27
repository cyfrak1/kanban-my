export interface labelSize {
    height : number,
    width : number,
    fontSize : number,
}
export interface labelData {
    labelText : string,
    labelColor : string
}
export interface labelWidthChanged {
    labelText : string,
    oldLabelText : string,
    width : number,
}
