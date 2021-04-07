import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MacroNutrients } from 'src/app/enums/macronutrients.enum';
import { IFood } from 'src/app/models/food.model';
import { IMeal } from 'src/app/models/meal.model';

@Injectable({
  providedIn: 'root'
})
export class MacronutrientsService {
  private totalMacronutrientsConsumed: number[] = [0, 0, 0];
  private totalMacronutrientsConsumedForMeal: number[] = [0, 0, 0];

  constructor(private store: AngularFirestore) { }

  public getTotalMacroNutrientConsumed(macronutrient: MacroNutrients) {
    switch (+macronutrient) {
      case MacroNutrients.protein:
        return Number(this.totalMacronutrientsConsumed[0].toFixed(2));
      case MacroNutrients.fat:
        return Number(this.totalMacronutrientsConsumed[1].toFixed(2));
      case MacroNutrients.carbs:
        return Number(this.totalMacronutrientsConsumed[2].toFixed(2));
      default:
        break;
    }
  }

  public getTotalMacroNutrientConsumedForMeal(macronutrient: MacroNutrients) {
    switch (+macronutrient) {
      case MacroNutrients.protein:
        return Number(this.totalMacronutrientsConsumedForMeal[0].toFixed(2));
      case MacroNutrients.fat:
        return Number(this.totalMacronutrientsConsumedForMeal[1].toFixed(2));
      case MacroNutrients.carbs:
        return Number(this.totalMacronutrientsConsumedForMeal[2].toFixed(2));
      default:
        break;
    }
  }

  public setMacronutrientsConsumedForMeal(meal: IMeal) {
    if (!meal.items) { return; }

    for (const item of meal.items) {
      this.totalMacronutrientsConsumedForMeal[0] += item.product.nutriments.proteins_value;
      this.totalMacronutrientsConsumedForMeal[1] += item.product.nutriments.fat_value;
      this.totalMacronutrientsConsumedForMeal[2] += item.product.nutriments.carbohydrates_value;
    }
  }

  public setBreakfastMacroNutrients(email: string): Promise<null> {
    const promise = new Promise<null>((resolve, reject) => {
      let protein = 0;
      let fat = 0;
      let carbs = 0;
      this.store.collection(email).doc('food').collection('breakfast').valueChanges({ idField: 'id' }).subscribe(breakfast => {
        for (const food of breakfast) {
          protein += food.product.nutriments.proteins_value;
          fat += food.product.nutriments.fat_value;
          carbs += food.product.nutriments.carbohydrates_value;
        }
        this.setTotalMacroNutrientConsumed(MacroNutrients.protein, protein);
        this.setTotalMacroNutrientConsumed(MacroNutrients.fat, fat);
        this.setTotalMacroNutrientConsumed(MacroNutrients.carbs, carbs);
        resolve(null);
      }), () => {
        reject(null);
      };
    });

    return promise;
  }

  public setLunchMacroNutrients(email: string): Promise<null> {
    const promise = new Promise<null>((resolve, reject) => {
      let protein = 0;
      let fat = 0;
      let carbs = 0;
      this.store.collection(email).doc('food').collection('lunch').valueChanges({ idField: 'id' }).subscribe(lunch => {
        for (const food of lunch) {
          protein += food.product.nutriments.proteins_value;
          fat += food.product.nutriments.fat_value;
          carbs += food.product.nutriments.carbohydrates_value;
        }
        this.setTotalMacroNutrientConsumed(MacroNutrients.protein, protein);
        this.setTotalMacroNutrientConsumed(MacroNutrients.fat, fat);
        this.setTotalMacroNutrientConsumed(MacroNutrients.carbs, carbs);
        resolve(null);
      }, () => {
        reject(null);
      });
    });

    return promise;
  }

  public setDinnerMacroNutrients(email: string): Promise<null> {
    const promise = new Promise<null>((resolve, reject) => {
      let protein = 0;
      let fat = 0;
      let carbs = 0;
      this.store.collection(email).doc('food').collection('dinner').valueChanges({ idField: 'id' }).subscribe(dinner => {
        for (const food of dinner) {
          protein += food.product.nutriments.proteins_value;
          fat += food.product.nutriments.fat_value;
          carbs += food.product.nutriments.carbohydrates_value;
        }
        this.setTotalMacroNutrientConsumed(MacroNutrients.protein, protein);
        this.setTotalMacroNutrientConsumed(MacroNutrients.fat, fat);
        this.setTotalMacroNutrientConsumed(MacroNutrients.carbs, carbs);
        resolve(null);
      }, () => {
        reject(null);
      });
    });

    return promise;
  }

  public setSnacksMacroNutrients(email: string): Promise<null> {
    const promise = new Promise<null>((resolve, reject) => {
      let protein = 0;
      let fat = 0;
      let carbs = 0;
      this.store.collection(email).doc('food').collection('snacks').valueChanges({ idField: 'id' }).subscribe(snacks => {
        for (const food of snacks) {
          protein += food.product.nutriments.proteins_value;
          fat += food.product.nutriments.fat_value;
          carbs += food.product.nutriments.carbohydrates_value;
        }
        this.setTotalMacroNutrientConsumed(MacroNutrients.protein, protein);
        this.setTotalMacroNutrientConsumed(MacroNutrients.fat, fat);
        this.setTotalMacroNutrientConsumed(MacroNutrients.carbs, carbs);
        resolve(null);
      }, () => {
        reject(null);
      });
    });

    return promise;
  }

  private setTotalMacroNutrientConsumed(macronutrient: MacroNutrients, amount: number) {
    switch (+macronutrient) {
      case MacroNutrients.protein:
        this.totalMacronutrientsConsumed[0] += amount;
        break;
      case MacroNutrients.fat:
        this.totalMacronutrientsConsumed[1] += amount;
        break;
      case MacroNutrients.carbs:
        this.totalMacronutrientsConsumed[2] += amount;
        break;
      default:
        break;
    }
  }

  public clearTotalMacroNutrientConsumed() {
    this.totalMacronutrientsConsumed = [0, 0, 0];
  }

  public clearTotalMacroNutrientConsumedForMeal() {
    this.totalMacronutrientsConsumedForMeal = [0, 0, 0];
  }
}
