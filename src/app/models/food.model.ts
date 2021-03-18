import { IProduct } from "./product.mode";

export interface IFood {
    code: number,
    product: IProduct,
    status_verbose: string
}
