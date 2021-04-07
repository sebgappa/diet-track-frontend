import { Injectable } from '@angular/core';
import { MacroNutrients } from 'src/app/enums/macronutrients.enum';

@Injectable({
  providedIn: 'root'
})

export class GoalsService {
  private macroNutrientGoals: number[] = [180, 70, 100, 2800];
  private recommendedMicroNutrientGoals: Map<string, number> = new Map<string, number>([
    ['fiber_value', 30],
    ['salt_value', 6],
    ['saturated-fat_value', 30],
    ['trans-fat_value', 2],
    ['sodium_value', 3.4],
    ['sugars_value', 30],
    ['calcium_value', 700],
    ['cholesterol_value', 300],
    ['iron_value', 8.7],
    ['magnesium_value', 410],
    ['zinc_value', 11],
    ['vitamin-a_value', 900],
    ['vitamin-c_value', 90],
    ['vitamin-b12_value', 2.4],
    ['vitamin-d_value', 20],
  ]);

  constructor() { }

  public getRecommendedMicroNutrientGoals() {
    return this.recommendedMicroNutrientGoals;
  }

  public getMacroNutrientGoal(macronutrient: MacroNutrients) {
    switch (+macronutrient) {
      case MacroNutrients.protein:
        return this.macroNutrientGoals[0];
      case MacroNutrients.fat:
        return this.macroNutrientGoals[1];
      case MacroNutrients.carbs:
        return this.macroNutrientGoals[2];
      case MacroNutrients.calories:
        return this.macroNutrientGoals[3];
      default:
        break;
    }
  }

  public setMacroNutrientGoal(macronutrient: MacroNutrients, value: number) {
    switch (+macronutrient) {
      case MacroNutrients.protein:
        this.macroNutrientGoals[0] = value;
        break;
      case MacroNutrients.fat:
        this.macroNutrientGoals[1] = value;
        break;
      case MacroNutrients.carbs:
        this.macroNutrientGoals[2] = value;
        break;
      case MacroNutrients.calories:
        this.macroNutrientGoals[3] = value;
        break;
      default:
        break;
    }
  }
}
