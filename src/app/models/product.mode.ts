import { INutriments } from './nutriment.mode';

export interface IProduct {
    product_name: string;
    nutriments: INutriments;
    serving_size?: string;
    serving_number?: number;
    brands: string;
}
