export interface ShopModel {
    id: number;
    productName: string;
    cost: number;
    url: string;
}

export interface Response{
    data : ShopModel[]
    httpCode: number;
    message: string;
}