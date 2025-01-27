import { ProductPrice } from "./productPrice";

export interface CoffeeReturnDTO {
    Id: number;
    Name: string;
    BeverageType: string;
    Description: string;
    BaseTime: number;
    Prices: ProductPrice[]
}