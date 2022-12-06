import { labelData } from "./labelInterface";

export interface PassDataToDialog {
    mainContent : string,
    asideContent : string,
    currentBucketColor : string,
    tuskTermin : string,
    labels : labelData[],
}
export interface EditMode {
    modeName : string,
    isActive : boolean,
}