import { ShopModel } from "./shop.model";

export interface PageModel{
    pageIndex: number;
    pageSizes: number;
    totalPage: number;
    sortBy: number;
    fillterColer : number;
    fillterSize: number;
    data : ShopModel[];
}