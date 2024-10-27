import {BaseModel} from "./base.model.ts";

interface DumbProductModel {
    title: string
    finalPrice: number
    previousPrice?: number
    image: string
    reductionPercent?: number
    stars: {
        number: number
        total: number
    }
    colorList?: string[]
    sizeList?: string[]
    user: Parse.User

    [key: string]: any
}

export type ProductModel = {} & DumbProductModel & BaseModel;

export interface CreateProductModel extends DumbProductModel {
}
