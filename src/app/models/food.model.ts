import { IProduct } from './product.mode';

export interface IFood {
    code?: string;
    product: IProduct;
    status_verbose: string;
}
