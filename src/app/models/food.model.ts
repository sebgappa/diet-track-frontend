import { IProduct } from './product.model';

export interface IFood {
    code?: string;
    product: IProduct;
    status_verbose: string;
}
