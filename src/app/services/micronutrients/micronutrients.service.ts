import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MicroNutrients } from 'src/app/enums/micronutrients.enum';
import { IMicro } from 'src/app/models/micro.model';
import { GoalsService } from '../goals/goals.service';
import { UserInfoService } from '../user-info/user-info.service';

@Injectable({
  providedIn: 'root'
})
export class MicronutrientsService {
  private microNutrientTotals: Map<string, number> = new Map<string, number>();

  constructor(
    private store: AngularFirestore,
    private goals: GoalsService,
    private userInfo: UserInfoService) { }

  getMicronutrientObjects() {
    const micronutrients: IMicro[] = [];

    for (const value in MicroNutrients) {
      let microTotal = this.microNutrientTotals.get(value) ? this.microNutrientTotals.get(value) : 0;

      const micronutrient: IMicro = {
        name: MicroNutrients[value],
        total: microTotal,
        goal: this.goals.getRecommendedMicroNutrientGoals().get(value),
        left: Number((this.goals.getRecommendedMicroNutrientGoals().get(value) - microTotal).toFixed(2)),
        percentage: this.calculateMicronutrientPercentage(microTotal, this.goals.getRecommendedMicroNutrientGoals().get(value))
      };
      micronutrients.push(micronutrient);
    }

    return micronutrients;
  }

  calculateMicronutrientPercentage(currentValue: number, goalValue: number) {
    const percentage = Math.round((currentValue / goalValue) * 100);
    if (percentage > 100) {
      return 100;
    }
    return percentage;
  }

  getMicronutrientTotals() {
    return this.microNutrientTotals;
  }

  setBreakfastMicronutrients(): Promise<null> {
    const promise = new Promise<null>((resolve, reject) => {
      this.store.collection(this.userInfo.getEmail()).doc('food').collection('breakfast').valueChanges({ idField: 'id' }).subscribe(breakfast => {
        for (const food of breakfast) {
          for (const value in MicroNutrients) {
            if (this.microNutrientTotals.has(value)) {
              const currentValue = this.microNutrientTotals.get(value);
              this.microNutrientTotals.set(value, Number((currentValue + food.product.nutriments[value]).toFixed(2)));
            } else {
              this.microNutrientTotals.set(value, Number(food.product.nutriments[value].toFixed(2)));
            }
          }
        }
        resolve(null);
      }, () => {
        reject(null);
      });
    });

    return promise;
  }

  setLunchMicronutrients(): Promise<null> {
    const promise = new Promise<null>((resolve, reject) => {
      this.store.collection(this.userInfo.getEmail()).doc('food').collection('lunch').valueChanges({ idField: 'id' }).subscribe(lunch => {
        for (const food of lunch) {
          for (const value in MicroNutrients) {
            if (this.microNutrientTotals.has(value)) {
              const currentValue = this.microNutrientTotals.get(value);
              this.microNutrientTotals.set(value, Number((currentValue + food.product.nutriments[value]).toFixed(2)));
            } else {
              this.microNutrientTotals.set(value, Number(food.product.nutriments[value].toFixed(2)));
            }
          }
        }
        resolve(null);
      }, () => {
        reject(null);
      });
    });

    return promise;
  }

  setDinnerMicronutrients(): Promise<null> {
    const promise = new Promise<null>((resolve, reject) => {
      this.store.collection(this.userInfo.getEmail()).doc('food').collection('dinner').valueChanges({ idField: 'id' }).subscribe(dinner => {
        for (const food of dinner) {
          for (const value in MicroNutrients) {
            if (this.microNutrientTotals.has(value)) {
              const currentValue = this.microNutrientTotals.get(value);
              this.microNutrientTotals.set(value, Number((currentValue + food.product.nutriments[value]).toFixed(2)));
            } else {
              this.microNutrientTotals.set(value, Number(food.product.nutriments[value].toFixed(2)));
            }
          }
        }
        resolve(null);
      }, () => {
        reject(null);
      });
    });

    return promise;
  }

  setSnacksMicronutrients(): Promise<null> {
    const promise = new Promise<null>((resolve, reject) => {
      this.store.collection(this.userInfo.getEmail()).doc('food').collection('snacks').valueChanges({ idField: 'id' }).subscribe(snacks => {
        for (const food of snacks) {
          for (const value in MicroNutrients) {
            if (this.microNutrientTotals.has(value)) {
              const currentValue = this.microNutrientTotals.get(value);
              this.microNutrientTotals.set(value, Number((currentValue + food.product.nutriments[value]).toFixed(2)));
            } else {
              this.microNutrientTotals.set(value, Number(food.product.nutriments[value].toFixed(2)));
            }
          }
        }
        resolve(null);
      }, () => {
        reject(null);
      });
    });

    return promise;
  }

  public clearTotalMacroNutrientConsumed() {
    this.microNutrientTotals.clear();
  }
}
