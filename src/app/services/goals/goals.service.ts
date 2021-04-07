import { Injectable } from '@angular/core';
import { Goals } from 'src/app/enums/goals.enum';
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

  public getMacroNutrientGoal(macronutrient: Goals) {
    switch (+macronutrient) {
      case Goals.protein:
        return this.macroNutrientGoals[0];
      case Goals.fat:
        return this.macroNutrientGoals[1];
      case Goals.carbs:
        return this.macroNutrientGoals[2];
      case Goals.calories:
        return this.macroNutrientGoals[3];
      default:
        break;
    }
  }

  public setMacroNutrientGoal(macronutrient: Goals, value: number) {
    switch (+macronutrient) {
      case Goals.protein:
        this.macroNutrientGoals[0] = value;
        break;
      case Goals.fat:
        this.macroNutrientGoals[1] = value;
        break;
      case Goals.carbs:
        this.macroNutrientGoals[2] = value;
        break;
      case Goals.calories:
        this.macroNutrientGoals[3] = value;
        break;
      default:
        break;
    }
  }
}
