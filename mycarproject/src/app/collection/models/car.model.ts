import { BrandModel } from "./brand.model";


export interface CarData {
    id: string;
    brand: BrandModel;
    type: string;
    fuel: string;
    year: Date;
    horsepower: Number;
    added: Date;
    user: string;
}