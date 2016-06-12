export interface stockList {list: Array<checkList>;}
export interface checkList {tradingVolume: boolean; isEMAok: boolean}
export class stockListing{
    public list: Array<checkList>;
}