import { IFood } from './food.model';

export class IMeal {
    name: string;
    description?: string;
    items: IFood[];
    image?: string;
    calories? : number;
    protein? : number;
    fat? : number;
    carbs? : number;
}
