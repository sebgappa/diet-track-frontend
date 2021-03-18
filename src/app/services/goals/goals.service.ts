import { Injectable } from '@angular/core';
import { MacroNutrients } from 'src/app/enums/macronutrients.enum';

@Injectable({
  providedIn: 'root'
})

export class GoalsService {
  private macroNutrientGoals: number[] = [180, 70, 100, 2800];

  constructor() { }

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
