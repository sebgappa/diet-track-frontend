import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MicroNutrients } from 'src/app/enums/micronutrients.enum';
import { IMicro } from 'src/app/models/micro.model';
import { GoalsService } from '../goals/goals.service';

@Injectable({
  providedIn: 'root'
})
export class MicronutrientsService {
  private microNutrientTotals: Map<string, number> = new Map<string, number>();

  constructor(
    private store: AngularFirestore,
    private goals: GoalsService) { }

  getMicronutrientObjects() {
    var micronutrients: IMicro[] = [];

    for(const value in MicroNutrients) {
      var micronutrient: IMicro = {
        name: MicroNutrients[value],
        total: this.microNutrientTotals.get(value),
        goal: this.goals.getRecommendedMicroNutrientGoals().get(value),
        left: Number((this.goals.getRecommendedMicroNutrientGoals().get(value) - this.microNutrientTotals.get(value)).toFixed(2)),
        percentage: this.calculateMicronutrientPercentage(this.microNutrientTotals.get(value), this.goals.getRecommendedMicroNutrientGoals().get(value))
      };
      micronutrients.push(micronutrient);
    }

    return micronutrients;
  }

  calculateMicronutrientPercentage(currentValue: number, goalValue: number) {
    var percentage = Math.round((currentValue / goalValue) * 100);
    if(percentage > 100) {
      return 100;
    }
    return percentage;
  }

  getMicronutrientTotals() {
    return this.microNutrientTotals;
  }

  setBreakfastMicronutrients(email: string): Promise<null> {
    var promise = new Promise<null>((resolve, reject) => {
      this.store.collection(email).doc('food').collection('breakfast').valueChanges({ idField: 'code' }).subscribe(breakfast => {
        for(var food of breakfast) {
          for(const value in MicroNutrients) {
            if(this.microNutrientTotals.has(value)) {
              var currentValue = this.microNutrientTotals.get(value);
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
    })

    return promise;
  }

  setLunchMicronutrients(email: string): Promise<null> {
    var promise = new Promise<null>((resolve, reject) => {
      this.store.collection(email).doc('food').collection('lunch').valueChanges({ idField: 'code' }).subscribe(lunch => {
        for(var food of lunch) {
          for(const value in MicroNutrients) {
            if(this.microNutrientTotals.has(value)) {
              var currentValue = this.microNutrientTotals.get(value);
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
    })

    return promise;
  }

  setDinnerMicronutrients(email: string): Promise<null> {
    var promise = new Promise<null>((resolve, reject) => {
      this.store.collection(email).doc('food').collection('dinner').valueChanges({ idField: 'code' }).subscribe(dinner => {
        for(var food of dinner) {
          for(const value in MicroNutrients) {
            if(this.microNutrientTotals.has(value)) {
              var currentValue = this.microNutrientTotals.get(value);
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
    })

    return promise;
  }

  setSnacksMicronutrients(email: string): Promise<null> {
    var promise = new Promise<null>((resolve, reject) => {
      this.store.collection(email).doc('food').collection('snacks').valueChanges({ idField: 'code' }).subscribe(snacks => {
        for(var food of snacks) {
          for(const value in MicroNutrients) {
            if(this.microNutrientTotals.has(value)) {
              var currentValue = this.microNutrientTotals.get(value);
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
    })

    return promise;
  }

  public clearTotalMacroNutrientConsumed() {
    this.microNutrientTotals.clear();
  }
}
