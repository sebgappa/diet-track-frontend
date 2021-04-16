import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Goals } from 'src/app/enums/goals.enum';

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

  constructor(private store: AngularFirestore) { }

  public getRecommendedMicroNutrientGoals() {
    return this.recommendedMicroNutrientGoals;
  }

  public fetchGoals(email: string): Promise<any> {
    const promise = Promise.all([
      this.fetchProtein(email),
      this.fetchFat(email),
      this.fetchCarbs(email),
      this.fetchCalories(email)
    ]);

    return promise;
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

  public setMacroNutrientGoal(macronutrient: Goals, value: number, email: string) {
    switch (+macronutrient) {
      case Goals.protein:
        this.store.collection(email).doc('food').collection('goals').doc('protein').set({value});
        this.macroNutrientGoals[0] = value;
        break;
      case Goals.fat:
        this.store.collection(email).doc('food').collection('goals').doc('fat').set({value});
        this.macroNutrientGoals[1] = value;
        break;
      case Goals.carbs:
        this.store.collection(email).doc('food').collection('goals').doc('carbs').set({value});
        this.macroNutrientGoals[2] = value;
        break;
      case Goals.calories:
        this.store.collection(email).doc('food').collection('goals').doc('calories').set({value});
        this.macroNutrientGoals[3] = value;
        break;
      default:
        break;
    }
  }

  private fetchProtein(email: string): Promise<any> {
    const promise = new Promise((resolve, reject) => {
      this.store.collection(email).doc('food').collection('goals').doc('protein').get().subscribe(protein => {
        if (protein.data()) {
          this.macroNutrientGoals[0] = protein.data().value;
        }
        resolve(null);
      }, () => {
        reject(null);
      })
    })
    return promise
  }

  private fetchFat(email: string) {
    const promise = new Promise((resolve, reject) => {
      this.store.collection(email).doc('food').collection('goals').doc('fat').get().subscribe(fat => {
        if (fat.data()) {
          this.macroNutrientGoals[1] = fat.data().value;
        }
        resolve(null);
      }, () => {
        reject(null);
      })
    })
    return promise
  }
  private fetchCarbs(email: string) {
    const promise = new Promise((resolve, reject) => {
      this.store.collection(email).doc('food').collection('goals').doc('carbs').get().subscribe(carbs => {
        if (carbs.data()) {
          this.macroNutrientGoals[2] = carbs.data().value;
        }
        resolve(null);
      }, () => {
        reject(null);
      })
    })
    return promise

  }
  private fetchCalories(email: string) {
    const promise = new Promise((resolve, reject) => {
      this.store.collection(email).doc('food').collection('goals').doc('calories').get().subscribe(calories => {
        if(calories.data()) {
          this.macroNutrientGoals[3] = calories.data().value;
        }
        resolve(null);
      }, () => {
        reject(null);
      })
    })
    return promise
  }

}
