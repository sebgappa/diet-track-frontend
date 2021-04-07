import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Calories } from 'src/app/enums/calories.enum';
import { MacroNutrients } from 'src/app/enums/macronutrients.enum';
import { GoalsService } from '../goals/goals.service';

@Injectable({
  providedIn: 'root'
})
export class CaloriesService {
  private caloriesConsumedPerMeal: number[] = [0, 0, 0, 0];

  constructor(
    private store: AngularFirestore,
    private goals: GoalsService) { }

  public getCaloriesConsumedPerMeal(meal: Calories) {
    switch (+meal) {
      case Calories.breakfast:
        return this.caloriesConsumedPerMeal[0];
      case Calories.lunch:
        return this.caloriesConsumedPerMeal[1];
      case Calories.dinner:
        return this.caloriesConsumedPerMeal[2];
      case Calories.snacks:
        return this.caloriesConsumedPerMeal[3];
      default:
        break;
    }
  }

  public getTotalCaloriesConsumed(): number {
    return Number(this.caloriesConsumedPerMeal.reduce((accumulator, currentValue) => accumulator + currentValue).toFixed(2));
  }

  public getRemainingCalories() {
    return Number((this.goals.getMacroNutrientGoal(MacroNutrients.calories) - this.getTotalCaloriesConsumed()).toFixed(2));
  }

  public setBreakfastCalories(email: string): Promise<null> {
    const promise = new Promise<null>((resolve, reject) => {
      let breakfastCalories = 0;
      this.store.collection(email).doc('food').collection('breakfast').valueChanges({ idField: 'code' }).subscribe(breakfast => {
        for (const food of breakfast) {
          breakfastCalories += food.product.nutriments['energy-kcal_value'];
        }
        this.setCaloriesConsumedPerMeal(Calories.breakfast, breakfastCalories);
        resolve(null);
      }), () => {
        reject(null);
      };
    });

    return promise;
  }

  public setLunchCalories(email: string): Promise<null> {
    const promise = new Promise<null>((resolve, reject) => {
      let lunchCalories = 0;
      this.store.collection(email).doc('food').collection('lunch').valueChanges({ idField: 'code' }).subscribe(lunch => {
        for (const food of lunch) {
          lunchCalories += food.product.nutriments['energy-kcal_value'];
        }
        this.setCaloriesConsumedPerMeal(Calories.lunch, lunchCalories);
        resolve(null);
      }, () => {
        reject(null);
      });
    });

    return promise;
  }

  public setDinnerCalories(email: string): Promise<null> {
    const promise = new Promise<null>((resolve, reject) => {
      let dinnerCalories = 0;
      this.store.collection(email).doc('food').collection('dinner').valueChanges({ idField: 'code' }).subscribe(dinner => {
        for (const food of dinner) {
          dinnerCalories += food.product.nutriments['energy-kcal_value'];
        }
        this.setCaloriesConsumedPerMeal(Calories.dinner, dinnerCalories);
        resolve(null);
      }, () => {
        reject(null);
      });
    });

    return promise;
  }

  public setSnacksCalories(email: string): Promise<null> {
    const promise = new Promise<null>((resolve, reject) => {
      let snacksCalories = 0;
      this.store.collection(email).doc('food').collection('snacks').valueChanges({ idField: 'code' }).subscribe(snacks => {
        for (const food of snacks) {
          snacksCalories += food.product.nutriments['energy-kcal_value'];
        }
        this.setCaloriesConsumedPerMeal(Calories.snacks, snacksCalories);
        resolve(null);
      }, () => {
        reject(null);
      });
    });

    return promise;
  }


  private setCaloriesConsumedPerMeal(meal: Calories, calories: number) {
    switch (+meal) {
      case Calories.breakfast:
        this.caloriesConsumedPerMeal[0] = calories;
        break;
      case Calories.lunch:
        this.caloriesConsumedPerMeal[1] = calories;
        break;
      case Calories.dinner:
        this.caloriesConsumedPerMeal[2] = calories;
        break;
      case Calories.snacks:
        this.caloriesConsumedPerMeal[3] = calories;
        break;
      default:
        break;
    }
  }
}
