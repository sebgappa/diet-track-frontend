import { MicroNutrients } from "../enums/micronutrients.enum";

export interface IMicro {
    name: string,
    total: number,
    goal: number,
    left: number,
    percentage: number
}
